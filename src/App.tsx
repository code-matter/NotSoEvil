import './styles/App.scss';
import {
  Routes,
  Route,
  useNavigate,
  useMatch
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
import { useTranslation } from 'react-i18next';
import { BsArrowLeft } from 'react-icons/bs';
function App() {
  const [lang, setLang] = useState(navigator.language.slice(0, 2))
  const [currentUser, setCurrentUser] = useState<any>()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const isHome = useMatch('/');
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
    {
      id: 'form',
      path: '/form',
      element: RDV
    },
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
        <div className='language-container' style={{ top: isHome ? '25px' : '' }}>
          <span className="go-back-btn" onClick={() => navigate('/')}>
            {!isHome ? <BsArrowLeft color='#ff7a9f' size={24} /> : <></>}
          </span>
          <div className="languages">
            <p className={lang === "fr" ? 'active' : 'inactive'}
              onClick={() => {
                i18next.changeLanguage('fr')
                setLang('fr')
              }}>FR</p>
            <span className="spacer"></span>
            <p className={lang === "en" ? 'active' : 'inactive'}
              onClick={() => {
                i18next.changeLanguage('en')
                setLang('en')
              }}>EN</p>
          </div>
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
              <div className='construction-text'>
                <h2>{t('construction.curious')}</h2>
                <p>{t('construction.come_back')}</p>
              </div>
              <CONSTRUCTION />
            </div>
          } />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
