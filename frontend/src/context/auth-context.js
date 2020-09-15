import React from 'react';

export default React.createContext({
  token: !!window.localStorage.getItem('accessToken'),
  userId: null,
  login: (token, userId, tokenExpiration) => { },
  logout: () => { localStorage.removeItem("accessToken") },
})