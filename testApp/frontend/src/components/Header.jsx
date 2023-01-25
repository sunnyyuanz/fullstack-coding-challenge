import React from 'react';
import { HeaderWrapper } from './Complaints.styles';
import {
  getClosedComplaints,
  getComplaints,
  getOpenComplaints,
  getLocalComplaints,
  getTopComplaints,
} from '../api/api';
import { Link } from 'react-router-dom';
export default function Header({
  token,
  setComplaints,
  setTopComplaintsTypes,
  logout,
}) {
  return (
    <HeaderWrapper>
      <div>
        <Link to={'/'}>
          <button
            onClick={() => {
              getComplaints(token, setComplaints);
            }}
          >
            All complaints
          </button>
        </Link>
      </div>
      <div>
        <Link to={'/'}>
          <button
            onClick={() => {
              getOpenComplaints(token, setComplaints);
            }}
          >
            Open complaints
          </button>
        </Link>
      </div>
      <div>
        <Link to={'/'}>
          <button
            onClick={() => {
              getLocalComplaints(token, setComplaints);
            }}
          >
            Complaints by My Constituents{' '}
          </button>
        </Link>
      </div>
      <div>
        <Link to={'/'}>
          <button
            onClick={() => {
              getClosedComplaints(token, setComplaints);
            }}
          >
            Closed complaints
          </button>
        </Link>
      </div>
      <div>
        <Link to={'/topcomplaints'}>
          <button
            style={{ background: 'green' }}
            onClick={() => {
              getTopComplaints(token, setTopComplaintsTypes);
            }}
          >
            top complaints types
          </button>
        </Link>
      </div>
      <div>
        <Link to={'/'}>
          <button style={{ background: 'red' }} onClick={() => logout()}>
            Logout
          </button>
        </Link>
      </div>
    </HeaderWrapper>
  );
}
