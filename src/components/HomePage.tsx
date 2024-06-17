// HomePage.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation('global');

  return <h1>{t('homePage')}</h1>;
};

export default HomePage;