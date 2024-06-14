import React from 'react';

const NavigationBar = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <ul className="nav nav-pills">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Books</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Reviews</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Login/Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default NavigationBar;