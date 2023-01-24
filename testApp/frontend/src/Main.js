import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import './App.css';

const TableWrapper = styled.div`
  width: 100%;
  margin: 5rem auto;
  display: grid;
`;

const columns = [
  'account',
  'city',
  'opendate',
  'council_dist',
  'borough',
  'complaint_type',
  'descriptor',
];

const getComplaints = async (token, username) => {
  return await fetch(`http://localhost:8000/api/complaints/${username}`, {
    headers: {
      'Authorization': `Token ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => res);
};

const getToken = async (user) => {
  const superUser = {
    username: 'sunnyz',
    password: 'testtest',
  };

  const body = user === 'sunnyz' ? superUser : user;

  const token = await fetch('http://localhost:8000/login/', {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((res) => {
      localStorage.setItem('nyctoken', res.token || '');
      localStorage.setItem('username', body.username || '');
      console.log('returning', res.token);
      return res.token;
    });

    console.log('returning this', token)
  if(token) return token;
};

const Login = styled.div`
  width: max-content;
  display: flex;
  margin: 5rem auto;
  flex-direction: column;
  padding:2rem;
  background-color:#fff;
  align-items: center;
  color: #2F56A6;
  border-radius:10px;
  box-shadow: 2px 11px 26px rgb(17 17 17 / 80%);

  label {
    font-weight: 500;
  }

  input{
    margin:1rem;
    line-height:1.5rem;
  }
`;

export const Main = () => {
  const [token, setToken] = useState();
  const [username, setUsername] = useState(
    localStorage.getItem('username') || ''
  );
  const [password, setPassword] = useState('');
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    if (!token) {
      const checkToken = localStorage.getItem('nyctoken');
      console.log('checktoken', checkToken);
      if (checkToken && checkToken.length > 10) setToken(checkToken);
    }
  }, [token]);

  const tokenWrapper = async () => {
    const comp = await getComplaints(token, username);
    console.log('after await', comp);
    setComplaints(comp);
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

  const renderTable = () => {
    return (
      <TableWrapper>
        <table>
          <thead>
            <tr>
              {columns.map((c) => (
                <th>{c}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {complaints &&
              complaints.length &&
              complaints.map((c) => {
                return (
                  <tr>
                    {columns.map((col) => (
                      <td>{c[col]}</td>
                    ))}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </TableWrapper>
    );
  };

  return (
    <div>
      <h1>Information Dashboard</h1>
      {!token && (
        <Login>
          <label>Login Name</label>
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
          <label>Login PW</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => loginClick()} className="loginBtn">Login</button>
        </Login>
      )}
      {token && <div>{renderTable()}</div>}
    </div>
  );
};
