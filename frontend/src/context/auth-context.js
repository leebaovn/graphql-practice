import React from 'react';

const token = localStorage.getItem("accessToken");

export default React.createContext({
  token: token || null,
  userId: null,
  login: (token, userId, tokenExpiration) => { },
  logout: () => { localStorage.removeItem("accessToken") },
})