import React, { useState, useContext, lazy } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import './App.css';

import MainNavigation from './components/Navigation/navigation';
import AuthContext, { AuthProvider } from './context/auth-context';

import AuthPage from './pages/login/Auth';
import Booking from './pages/Booking';
import Event from './pages/Event';
import Homepage from './components/Homepage';
function Routes() {
  const [AuthState, AuthDispatch] = useContext(AuthContext);

  const { token } = AuthState;
  return (
    <Router>
      <MainNavigation />
      <main className='main-content'>
        <Switch>
          {token && <Redirect from='/auth' to='/events' exact />}

          {!token && <Route path='/auth' component={AuthPage} />}

          <Route path='/events' exact component={Event} />

          {token && <Route path='/bookings' exact component={Booking} />}

          <Route path='/' exact component={Homepage} />

          {!token && <Redirect to='/auth' />}
        </Switch>
      </main>
    </Router>
  );
}

export default Routes;
