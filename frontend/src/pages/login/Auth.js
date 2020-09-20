import React, { useState, useContext } from 'react';
import './auth.css';
import AuthContext from './../../context/auth-context';
import axiosClient from './../../api/axiosClient';
import { LOGIN } from './../../api/query/User.query';
import { CREATE_USER } from './../../api/mutation/User.mutation';
function AuthPage(props) {
  const [AuthState, AuthDispatch] = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailInput = email.current.value;
    const pwdInput = password.current.value;
    if (emailInput.trim().length === 0 || pwdInput.trim().length === 0) {
      return;
    }
    let requestBody = {
      ...LOGIN,
      variables: {
        email: emailInput,
        password: pwdInput,
      },
    };
    if (!isLogin) {
      requestBody = {
        ...CREATE_USER,
        variables: {
          email: emailInput,
          password: pwdInput,
        },
      };
    }
    axiosClient
      .post('/', requestBody)
      .then((resData) => {
        const { token, userId } = resData.data.login;
        if (token) {
          AuthDispatch({
            type: 'login',
            payload: {
              token,
              userId,
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const email = React.createRef();
  const password = React.createRef();
  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <div className='form-control'>
        <label htmlFor='email'>E-mail</label>
        <input type='text' name='email' id='email' ref={email} />
      </div>
      <div className='form-control'>
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' id='password' ref={password} />
      </div>
      <div className='form-actions'>
        <button type='submit'>{isLogin ? 'Sign in' : 'Sign up'}</button>
        <button type='button' onClick={() => setIsLogin(!isLogin)}>
          Switch to {isLogin ? 'Sign up' : 'Sign in'}
        </button>
      </div>
    </form>
  );
}

export default AuthPage;
