// NavigationBar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const NavigationBar = () => {
  return (
    <div className="navbar">
      <Link className="nav-link active" aria-current="page" to="/">Home</Link>
      <Link className="nav-link" to="/books">Books</Link>
      <Link className="nav-link" to="/login">Login/Logout</Link>
    </div>
  );
};

export default NavigationBar;