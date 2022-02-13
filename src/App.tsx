import './styles/App.scss';
import {
  Routes,
  Route
} from "react-router-dom";
import HomePage from './pages/HomePage';
import RDV from './pages/RDV';
import i18next from 'i18next'
import { useState } from 'react';

function App() {
  const [lang, setLang] = useState('fr')
  return (
    <div className="App">
      <div className='language-container'>
        <p className={lang === "fr" ? 'active' : 'inactive'}
          onClick={() => {
            i18next.changeLanguage('fr')
            console.log(i18next.language)
            setLang(i18next.language)
          }}>FR</p>
        <span></span>
        <p className={lang === "en" ? 'active' : 'inactive'}
          onClick={() => {
            i18next.changeLanguage('en')
            console.log(i18next.language)
            setLang(i18next.language)
          }}>EN</p>
      </div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form" element={<RDV />} />
      </Routes>
    </div>
  );
}

export default App;
