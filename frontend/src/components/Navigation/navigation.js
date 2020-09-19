import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './navigation.css';
import AuthContext from './../../context/auth-context';
import { UserOutlined } from '@ant-design/icons';

const MainNavigation = (props) => {
  const { token, logout } = useContext(AuthContext);
  return (
    <header className='header'>
      <div className='header__logo'>
        <h1>Pet project</h1>
      </div>
      <nav className='header__nav'>
        <ul>
          {!token && (
            <li>
              <NavLink to='/auth'>Authenticate</NavLink>
            </li>
          )}
          <li>
            <NavLink to='/events'>Events</NavLink>
          </li>
          {token && (
            <React.Fragment>
              <li>
                <NavLink to='/bookings'>Bookings</NavLink>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </React.Fragment>
          )}
        </ul>
      </nav>
      <div className='user'>
        <div className='user__avt'>
          <UserOutlined />
        </div>
        <div className='user__name'>Lee Bao</div>
      </div>
    </header>
  );
};

export default MainNavigation;
