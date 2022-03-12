import './styles/App.scss';
import {
  Routes,
  Route,
} from "react-router-dom";
import HomePage from './pages/HomePage';
import RDV from './pages/RDV';
import { useReducer, } from 'react';
import Login from './pages/Login';
import { UserContext } from './context/UserContext';
import AdminHome from './pages/AdminHome';
import { ReactComponent as CONSTRUCTION } from './assets/construction.svg'
import { useTranslation } from 'react-i18next';
import { userInitialstate, userReducer } from './reducers/UserReducer';
import Layout from './components/Layout/Layout';
import Shop from './pages/Shop';

export const routes = [
  {
    id: 'home',
    label: 'general.home',
    path: '/',
    element: HomePage
  },
  {
    id: 'form',
    label: 'general.form',
    path: '/form',
    element: RDV
  },
  {
    id: 'shop',
    label: 'general.shop',
    path: '/shop',
    element: Shop
  },
  {
    id: 'login',
    label: 'general.login',
    path: '/admin/login',
    element: Login
  },
  {
    id: 'admin-home',
    label: 'general.admin_home',
    path: 'admin/home',
    element: AdminHome
  }
]

function App() {
  const { t } = useTranslation()
  const [state, dispatch] = useReducer<any>(userReducer, userInitialstate);


  const AppRouter = () => {
    return (
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
    )
  }


  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Layout>
        <AppRouter />
      </Layout>
    </UserContext.Provider>
  );
}

export default App;
