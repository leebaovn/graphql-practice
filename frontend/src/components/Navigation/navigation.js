import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './navigation.css';
import AuthContext from './../../context/auth-context';
import CartContext from './../../context/cart/cart-context';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import { Badge } from 'antd';
const MainNavigation = (props) => {
  const [AuthState, AuthDispatch] = useContext(AuthContext);
  const [CartState, CartDispatch] = useContext(CartContext);
  const { token } = AuthState;
  function logout() {
    AuthDispatch({ type: 'logout' });
  }
  return (
    <header className='header'>
      <div className='header__logo'>
        <h1>
          <NavLink to='/'>Pet project</NavLink>
        </h1>
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
        <div className='user__cart'>
          <span className='avatar-item'>
            <Badge count={CartState.items.length}>
              <Avatar
                shape='circle'
                icon={<ShoppingCartOutlined />}
                style={{ backgroundColor: 'inherit', color: '#333' }}
              />
            </Badge>
          </span>
        </div>
      </div>
    </header>
  );
};

export default MainNavigation;
