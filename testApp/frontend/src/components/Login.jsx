import React, { useState } from 'react';
import { getToken } from '../api/api';
import { LoginStyles, LoginButton } from './Complaints.styles';
export default function Login({ setToken }) {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(
    localStorage.getItem('username') || ''
  );
  const loginClick = async () => {
    if (username && password) {
      const nt = await getToken({ username, password });
      setToken(nt);
    } else {
      alert('Username or Password is not correct, Please try again');
    }
  };
  return (
    <LoginStyles>
      <label>Login Name</label>
      <input type="text" onChange={(e) => setUsername(e.target.value)} />
      <label>Login PW</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <LoginButton onClick={() => loginClick()}>Login</LoginButton>
    </LoginStyles>
  );
}
