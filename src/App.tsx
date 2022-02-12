import './styles/App.scss';
import {
  Routes,
  Route
} from "react-router-dom";
import HomePage from './pages/HomePage';
import RDV from './pages/RDV';
import i18next from 'i18next'

function App() {
  return (
    <div className="App">
      <div className='language-container'>
        <p className={i18next.language === "fr" ? 'active' : 'inactive'}
          onClick={() => i18next.changeLanguage('fr')}>FR</p>
        <span></span>
        <p className={i18next.language === "en" ? 'active' : 'inactive'}
          onClick={() => i18next.changeLanguage('en')}>EN</p>
      </div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form" element={<RDV />} />
      </Routes>
    </div>
  );
}

export default App;
