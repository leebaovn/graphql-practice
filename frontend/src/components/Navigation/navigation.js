import React from 'react'
import { NavLink } from 'react-router-dom'
import './navigation.css';

const MainNavigation = (props) => (
  <header className="header">
    <div className="header__logo">
      <h1>Pet project</h1>
    </div>
    <nav className="header__nav">
      <ul>
        <li><NavLink to="/auth">Auth</NavLink></li>
        <li><NavLink to="/events">Events</NavLink></li>
        <li><NavLink to="/bookings">Bookings</NavLink></li>
      </ul>
    </nav>
  </header>
)

export default MainNavigation;