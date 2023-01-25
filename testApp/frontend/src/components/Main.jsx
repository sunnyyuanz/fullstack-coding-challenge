import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopComplaints from './TopComplaints';
import Login from './Login';
import { MainHeader } from './Complaints.styles';
import Complaints from './Complaints';
import { getComplaints } from '../api/api';
import { getTopComplaints } from '../api/api';
import Header from './Header';

export default function Main() {
  const [token, setToken] = useState();

  const [complaints, setComplaints] = useState([]);
  const [topComplaintsTypes, setTopComplaintsTypes] = useState([]);

  useEffect(() => {
    if (!token) {
      const checkToken = localStorage.getItem('nyctoken');
      if (checkToken && checkToken.length > 10) setToken(checkToken);
    } else {
      getComplaints(token, setComplaints);
      getTopComplaints(token, setTopComplaintsTypes);
    }
  }, [token]);

  const logout = () => {
    localStorage.clear();
    setToken();
    setComplaints([]);
    setTopComplaintsTypes([]);
  };

  return (
    <Router>
      <div>
        <MainHeader>Information Dashboard</MainHeader>
        {token && (
          <Header
            token={token}
            setComplaints={setComplaints}
            setTopComplaintsTypes={setTopComplaintsTypes}
            logout={logout}
          />
        )}
        <Routes>
          <Route
            path="/"
            element={
              token ? (
                <Complaints complaints={complaints} />
              ) : (
                <Login setToken={setToken} />
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
}
