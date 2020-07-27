import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import AuthPage from './pages/login/Auth';
import Booking from './pages/Booking';
import Event from './pages/Event';
import MainNavigation from './components/Navigation/navigation'
import './App.css'
function App() {
  return (
    <>
      <Router>
        <React.Fragment>
          <MainNavigation />
          <main className="main-content">
            <Switch>
              <Redirect from='/' to='/auth' exact />
              <Route path='/auth' component={AuthPage} />
              <Route path='/events' component={Event} />
              <Route path='/bookings' component={Booking} />
            </Switch>
          </main>
        </React.Fragment>
      </Router>
    </>
  );
}

export default App;
