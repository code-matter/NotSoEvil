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
  const [lang, setLang] = useState(navigator.language.slice(0, 2))

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
            setLang('fr')
          }}>FR</p>
        <span></span>
        <p className={lang === "en" ? 'active' : 'inactive'}
          onClick={() => {
            i18next.changeLanguage('en')
            setLang('en')
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
