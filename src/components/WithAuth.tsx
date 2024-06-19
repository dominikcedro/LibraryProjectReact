import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (WrappedComponent : FC) => {
  return (props:Record<string, unknown>) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    let isAuthenticated = false;

    if (token) {
      const tokenExpiration = JSON.parse(atob(token.split('.')[1])).exp;
      isAuthenticated = tokenExpiration > Date.now() / 1000;
    }

    if (!isAuthenticated) {
      navigate('/login');
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;