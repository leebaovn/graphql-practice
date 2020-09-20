import React from 'react';
import { useReducer } from 'react';
const AuthContext = React.createContext();
export default AuthContext;
const INITIAL_STATE = {
  token: window.localStorage.getItem('accessToken') || '',
  userId: window.localStorage.getItem('userId') || '',
};
function reducer(state, action) {
  switch (action.type) {
    case 'login':
      window.localStorage.setItem('accessToken', action.payload.token);
      window.localStorage.setItem('userId', action.payload.userId);
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
      };
    case 'logout':
      return {
        ...state,
        token: '',
        userId: '',
      };
    default:
      return state;
  }
}
export const AuthProvider = ({ children }) => {
  const [AuthState, AuthDispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <AuthContext.Provider value={[AuthState, AuthDispatch]}>
      {children}
    </AuthContext.Provider>
  );
};
