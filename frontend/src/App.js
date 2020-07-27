import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import AuthPage from './pages/login/Auth';
import Booking from './pages/Booking';
import Event from './pages/Event';
import MainNavigation from './components/Navigation/navigation'
import './App.css';
import AuthContext from './context/auth-context';


function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const login = (token, userId, tokenExpiration) => {
    setToken(token);
    setUserId(userId);
  }

  const logout = () => {
    setToken(null);
    setUserId(null);
  }
  return (
    <>
      <Router>
        <React.Fragment>
          <AuthContext.Provider value={{ token, userId, login, logout }}>
            <MainNavigation />
            <main className="main-content">
              <Switch>
                {token && <Redirect from='/' to='/events' exact />}
                {token && <Redirect from='/auth' to='/events' exact />}

                {!token && <Route path='/auth' component={AuthPage} />}
                <Route path='/events' component={Event} />
                {token && <Route path='/bookings' component={Booking} />}
                {!token && <Redirect to='/auth' exact />} // Chưa login thì luôn về trang login
              </Switch>
            </main>
          </AuthContext.Provider>
        </React.Fragment>
      </Router>
    </>
  );
}

export default App;
