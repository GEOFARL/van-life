import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header>
      <Link className="site-logo" to="/">
        #VANLIFE
      </Link>
      <nav>
        <Link to="/vans">Vans</Link>
        <Link to="/about">About</Link>
        <Link to="/host">Host</Link>
      </nav>
    </header>
  );
};
