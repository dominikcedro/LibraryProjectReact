// NavigationBar.tsx
import React, {ReactNode, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Navbar.css';
import {SelectChangeEvent} from "@mui/material";
import { isLoggedIn } from '../api/auth';
import { isLoggedIn as checkIsLoggedIn } from '../api/auth';

const NavigationBar = () => {
  const [language, setLanguage] = React.useState('pl');
  const { t, i18n } = useTranslation('global');
  const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
    setIsLoggedIn(checkIsLoggedIn());
  }, []);

    useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(checkIsLoggedIn());
    };

    // Call the function once initially to set the correct state
    handleStorageChange();

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);



  const logout = () => {
    localStorage.removeItem('jwtToken');
    setIsLoggedIn(false);
    console.log('JWT deleted');
  };
  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value as string;
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  return (
    <div className="navbar">
      <Link className="nav-link active" aria-current="page" to="/">{t('home')}</Link>
      <Link className="nav-link" to="/books">{t('books')}</Link>
      <Link className="nav-link" to="/reviews">{t('reviews')}</Link>
<Link className="nav-link" to="/login" onClick={(e) => { if (isLoggedIn) { e.preventDefault(); logout(); } }}>{isLoggedIn ? t('logout') : t('login')}</Link>        <select value={language} onChange={changeLanguage}>
        <option value="en">English</option>
        <option value="pl">Polski</option>
      </select>
    </div>
  );
};

export default NavigationBar;