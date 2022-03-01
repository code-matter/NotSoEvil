import './styles/App.scss';
import {
  Routes,
  Route
} from "react-router-dom";
import HomePage from './pages/HomePage';
import RDV from './pages/RDV';
import i18next from 'i18next'
import { useEffect, useState } from 'react';
import Shop from './pages/Shop';
import Login from './pages/Login';
import { firebaseAuth } from './utils/firebase';
import { UserContext } from './context/UserContext';
import AdminHome from './pages/AdminHome';
import Button from './components/UI/Button';
import { ReactComponent as CONSTRUCTION } from './assets/construction.svg'
function App() {
  const [lang, setLang] = useState(navigator.language.slice(0, 2))
  const [currentUser, setCurrentUser] = useState<any>()

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user)
        console.log('logged in');
      } else {
        console.log('logged out');
        setCurrentUser(null)
      }
    })
    return () => {
      firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
          setCurrentUser(user)
          console.log('logged in');
        } else {
          console.log('logged out');
          setCurrentUser(null)
        }
      })
    }
  }, [])




  const routes = [
    {
      id: 'home',
      path: '/',
      element: HomePage
    },
    // {
    //   id: 'form',
    //   path: '/form',
    //   element: RDV
    // },
    // {
    //   id: 'shop',
    //   path: '/shop',
    //   element: Shop
    // },
    {
      id: 'login',
      path: '/admin/login',
      element: Login
    },
    {
      id: 'admin-home',
      path: 'admin/home',
      element: AdminHome
    }
  ]



  return (
    <UserContext.Provider value={currentUser}>
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
          <Route path="*" element={
            <div className='construction-zone'>
              <CONSTRUCTION />
              <h2>Ohh quelqu'un de curieux?</h2>
              <p>Revient sous peu, tu pourras y voir plein de couleur et bin de la bonne humeur!</p>
              <Button label="BACK" onClick={() => window.location.replace('/')} />
            </div>
          } />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
