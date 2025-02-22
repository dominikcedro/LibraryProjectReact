import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import global_en from './translation/eng/global.json';
import global_pl from './translation/pl/global.json';
import global_es from './translation/esp/global.json';

import li8next from 'i18next';
import { I18nextProvider } from 'react-i18next';

li8next.init({
  interpolation: { escapeValue: true },
  lng: 'en',
  resources: {
    en: {
      global: global_en,
    },
    pl: {
      global: global_pl,
    },
      es: {
        global: global_es,
      }
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={li8next}>
        <App />

    </I18nextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
