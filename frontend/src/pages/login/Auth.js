import React, { useState, useContext } from 'react';
import './auth.css'
import AuthContext from './../../context/auth-context';
function AuthPage(props) {
  const { token, login } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailInput = email.current.value;
    const pwdInput = password.current.value;
    if (emailInput.trim().length === 0 || pwdInput.trim().length === 0) {
      return;
    }
    let requestBody = {
      query: `
        query Login($email: String!, $password: String!){
          login(email: $email, password: $password){
            userId
            token
            tokenExpiration
          }
        }
    `,
      variables: {
        email: emailInput,
        password: pwdInput
      }
    }
    if (!isLogin) {
      requestBody = {
        query: `
        mutation CreateUser($email: String!, $password: String!){
          createUser(userInput: {
            email:$email,
            password:$password
          }){
            _id
            email
          }
        }
      `,
        variables: {
          email: emailInput,
          password: pwdInput
        }
      }
    }
    fetch('http://localhost:3003/graphql', {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': "application/json",
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        // setIsLogin(true);
        return res.json();
      })
      .then(resData => {
        const { token, userId, tokenExpiration } = resData.data.login;
        if (token) {
          login(token, userId, tokenExpiration);
        }
        if (isLogin) {
          localStorage.setItem("accessToken", token);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  const email = React.createRef();
  const password = React.createRef();
  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-control">
        <label htmlFor="email">E-mail</label>
        <input type="text" name="email" id="email" ref={email} />
      </div>
      <div className="form-control">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" ref={password} />
      </div>
      <div className="form-actions">
        <button type="submit" >{isLogin ? 'Sign in' : 'Sign up'}</button>
        <button type="button" onClick={() => setIsLogin(!isLogin)}>Switch to {isLogin ? 'Sign up' : 'Sign in'}</button>
      </div>
    </form>
  )
}

export default AuthPage;


