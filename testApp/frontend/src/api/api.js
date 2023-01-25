export const getToken = async (user) => {
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
      return res.token;
    });
  if (token) return token;
};

export const getComplaints = (token, setComplaints) => {
  fetch('http://localhost:8000/api/complaints/', {
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
export const getOpenComplaints = (token, setComplaints) => {
  fetch('http://localhost:8000/api/complaints/openCases/', {
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
export const getLocalComplaints = (token, setComplaints) => {
  fetch('http://localhost:8000/api/complaints/localComplaints', {
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
export const getTopComplaints = async (token, setTopComplaintsTypes) => {
  return await fetch('http://localhost:8000/api/complaints/topComplaints/', {
    headers: {
      Authorization: `Token ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => {
      setTopComplaintsTypes(res);
    });
};
export const getClosedComplaints = (token, setComplaints) => {
  fetch('http://localhost:8000/api/complaints/closedCases/', {
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
