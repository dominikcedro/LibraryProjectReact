// NavigationBar.tsx
import React, {ReactNode} from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Navbar.css';
import {SelectChangeEvent} from "@mui/material";

const NavigationBar = () => {
  const [language, setLanguage] = React.useState('pl');
  const { t, i18n } = useTranslation('global');

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
      <Link className="nav-link" to="/login">{t('loginLogout')}</Link>
      <select value={language} onChange={changeLanguage}>
        <option value="en">English</option>
        <option value="pl">Polski</option>
      </select>
    </div>
  );
};

export default NavigationBar;