import './styles/App.scss';
import {
  Routes,
  Route
} from "react-router-dom";
import HomePage from './pages/HomePage';
import RDV from './pages/RDV';
import i18next from 'i18next'
import { useState } from 'react';
import Shop from './pages/Shop';

function App() {
  const [lang, setLang] = useState('fr')
  const routes = [
    {
      id: 'home',
      path: '/',
      element: HomePage
    },
    {
      id: 'form',
      path: '/form',
      element: RDV
    },
    {
      id: 'shop',
      path: '/shop',
      element: Shop
    },
  ]
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
        {routes.map(route =>
          <Route
            key={route.id}
            path={route.path}
            element={<route.element />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
