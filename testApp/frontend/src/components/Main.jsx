import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import TopComplaints from './TopComplaints';

const complaintsColumns = [
  'account',
  'city',
  'opendate',
  'council_dist',
  'borough',
  'complaint_type',
  'descriptor',
];

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 0.3rem;
  button {
    background-color: #2f56a6;
    min-width: 10rem;
    margin: 0 2rem;
    color: #fff;
    border: none;
    padding: 1rem;
    font-size: 01rem;
    text-transform: capitalize;
    font-weight: 500;
    cursor: pointer;
  }
`;

const getToken = async (user) => {
  const token = await fetch('http://localhost:8000/login/', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((res) => {
      localStorage.setItem('nyctoken', res.token || '');
      localStorage.setItem('username', user.username || '');
      console.log('returning', res.token);
      return res.token;
    });

  console.log('returning this', token);
  if (token) return token;
};

const Login = styled.div`
  width: max-content;
  display: flex;
  margin: 5rem auto;
  flex-direction: column;
  padding: 2rem;
  background-color: #fff;
  align-items: center;
  color: #2f56a6;
  border-radius: 10px;
  box-shadow: 2px 11px 26px rgb(47 86 166 / 50%);

  label {
    font-weight: 500;
  }

  input {
    margin: 1rem;
    line-height: 1.5rem;
  }

  button {
    background-color: #2f56a6;
    min-width: 10rem;
    color: #fff;
    border: none;
    padding: 0.5rem;
    text-transform: capitalize;
    font-weight: 500;
    cursor: pointer;
    width: 86%;
    margin-top: 1rem;
    border-radius: 10px;
  }
`;

export const Main = () => {
  const [token, setToken] = useState();
  const [username, setUsername] = useState(
    localStorage.getItem('username') || ''
  );
  const [password, setPassword] = useState('');
  const [complaints, setComplaints] = useState([]);
  const [topComplaintsTypes, setTopComplaintsTypes] = useState([]);

  useEffect(() => {
    if (!token) {
      const checkToken = localStorage.getItem('nyctoken');
      console.log('checktoken', checkToken);
      if (checkToken && checkToken.length > 10) setToken(checkToken);
    }
  }, [token]);

  const tokenWrapper = () => {
    getComplaints(token, username);
  };

  useEffect(() => {
    console.log(token);
    if (token) {
      tokenWrapper();
    }
  }, [token]);

  const loginClick = async () => {
    if (username === 'sunnyz') {
      const nt = await getToken(username);
      console.log('got stuff', nt);
      setToken(nt);
    } else {
      if (username && password) {
        const nt = await getToken({ username, password });
        setToken(nt);
      }
    }
  };

  const getComplaints = (token, username) => {
    console.log(token, username);
    fetch(`http://localhost:8000/api/complaints/${username}`, {
      headers: {
        Authorization: `Token ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setComplaints(res);
        console.log(res, typeof res, res.length);
      });
  };

  const getOpenComplaints = (token, username) => {
    fetch(`http://localhost:8000/api/complaints/openCases/${username}`, {
      headers: {
        Authorization: `Token ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setComplaints(res);
      });
  };

  const getLocalComplaints = (token, username) => {
    fetch(`http://localhost:8000/api/complaints/localComplaints/${username}`, {
      headers: {
        Authorization: `Token ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setComplaints(res);
      });
  };

  const getTopComplaints = async (token, username) => {
    return await fetch(
      `http://localhost:8000/api/complaints/topComplaints/${username}`,
      {
        headers: {
          Authorization: `Token ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setTopComplaintsTypes(res);
        console.log('top 3!', res, typeof res, Object.keys(res));
      });
  };

  const getClosedComplaints = (token, username) => {
    fetch(`http://localhost:8000/api/complaints/closedCases/${username}`, {
      headers: {
        Authorization: `Token ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setComplaints(res);
      });
  };

  const renderHeader = () => {
    return (
      <HeaderWrapper>
        <div>
          <Link to={'/'}>
            <button onClick={() => getComplaints(token, username)}>
              All complaints
            </button>
          </Link>
        </div>
        <div>
          <Link to={'/'}>
            <button onClick={() => getOpenComplaints(token, username)}>
              Open complaints
            </button>
          </Link>
        </div>
        <div>
          <Link to={'/'}>
            <button onClick={() => getLocalComplaints(token, username)}>
              Complaints by My Constituents{' '}
            </button>
          </Link>
        </div>
        <div>
          <Link to={'/topcomplaints'}>
            <button onClick={() => getTopComplaints(token, username)}>
              top complaints types
            </button>
          </Link>
        </div>
        <div>
          <Link to={'/'}>
            <button onClick={() => getClosedComplaints(token, username)}>
              Closed complaints
            </button>
          </Link>
        </div>
      </HeaderWrapper>
    );
  };

  const renderComplaintsTable = () => {
    return (
      <div className="tableWrapper">
        <table>
          <thead>
            <tr>
              {complaintsColumns.map((c, i) => (
                <th key={i}>{c.split('_').join(' ')}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {complaints &&
              complaints.length &&
              complaints.map((c, i) => {
                return (
                  <tr key={i}>
                    {complaintsColumns.map((col, i) => (
                      <td key={i}>{c[col]}</td>
                    ))}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <Router>
      <div>
        <h1
          style={{ borderBottom: '2px solid #e5e5e5', paddingBottom: '1rem' }}
        >
          Information Dashboard
        </h1>
        {token && <div>{renderHeader()}</div>}
        <Routes>
          <Route
            path="/"
            element={
              token && complaints.length ? (
                <div>{renderComplaintsTable()}</div>
              ) : (
                <Login>
                  <label>Login Name</label>
                  <input
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label>Login PW</label>
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button onClick={() => loginClick()}>Login</button>
                </Login>
              )
            }
          />

          <Route
            path="/topcomplaints"
            element={<TopComplaints topComplaintsTypes={topComplaintsTypes} />}
          />
        </Routes>
      </div>
    </Router>
  );
};
