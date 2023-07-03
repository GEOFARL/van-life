import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import avatarLogo from '../assets/images/avatar-icon.png';

export const Header = () => {
  const activeStyle = {
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: '#161616',
  };

  return (
    <header>
      <Link className="site-logo" to="/">
        #VANLIFE
      </Link>
      <nav>
        <NavLink
          to="/vans"
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          Vans
        </NavLink>
        <NavLink
          to="/about"
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          About
        </NavLink>
        <NavLink
          to="/host"
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          Host
        </NavLink>
        <Link to="login" className="login-link">
          <img src={avatarLogo} className="login-icon" alt="avatar" />
        </Link>
      </nav>
    </header>
  );
};
