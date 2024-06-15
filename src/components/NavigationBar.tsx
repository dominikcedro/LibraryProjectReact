import React from 'react';
import './Navbar.css';

const NavigationBar = () => {
  return (
    <div className="navbar">
      <a className="nav-link active" aria-current="page" href="#">Home</a>
      <a className="nav-link" href="#">Books</a>
      <a className="nav-link" href="#">Reviews</a>
      <a className="nav-link" href="#">Login/Logout</a>
    </div>
  );
};

export default NavigationBar;