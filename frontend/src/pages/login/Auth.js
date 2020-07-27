import React, { useState } from 'react';
import './auth.css'
function AuthPage(props) {

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
        query{
          login(email: "${emailInput}", password: "${pwdInput}"){
            userId
            token
            tokenExpiration
          }
        }
    `}
    if (!isLogin) {
      requestBody = {
        query: `
        mutation{
          createUser(userInput: {
            email:"${emailInput}",
            password:"${pwdInput}"
          }){
            _id
            email
          }
        }
      `}
    }
    fetch('http://localhost:3003/graphql', {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': "application/json",

      }
    }).then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Failed!");
      }
    }).then(resData => {
      console.log(resData);
    }).catch(err => {
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
      <div className="form-action">
        <button type="submit" >{isLogin ? 'Sign in' : 'Sign up'}</button>
        <button type="button" onClick={() => setIsLogin(!isLogin)}>Switch to {isLogin ? 'Sign up' : 'Sign in'}</button>
      </div>
    </form>
  )
}

export default AuthPage;


