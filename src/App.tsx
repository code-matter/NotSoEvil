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
