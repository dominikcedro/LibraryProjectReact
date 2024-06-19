import React from 'react';
import Clock from './Clock';
import './HomePage.css';
import {useTranslation} from "react-i18next";

const HomePage = () => {
        const {t, i18n} = useTranslation('global'); // Use useTranslation hook

  return (
    <div className="home-page">
      <h1 className="library-text">{t('home_page.welcome')}</h1>
      <Clock />
    </div>
  );
};

export default HomePage;