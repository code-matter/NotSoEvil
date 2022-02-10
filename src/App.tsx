import React from 'react';
import './styles/App.scss';
import {
  Routes,
  Route
} from "react-router-dom";
import HomePage from './pages/HomePage';
import RDV from './pages/RDV';
import i18next from 'i18next'
import { useTranslation } from 'react-i18next';

export const toggleLocale = () => {
  i18next.changeLanguage(i18next.language === "fr" ? "en" : "fr");
};

function App() {
  const { t } = useTranslation()
  return (
    <div className="App">
      <button style={{ position: 'fixed', zIndex: 999, top: 0, left: 0 }} onClick={toggleLocale}>{t('general.language')}</button>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form" element={<RDV />} />
      </Routes>
    </div>
  );
}

export default App;
