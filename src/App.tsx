import HomePage from './pages/HomePage';
import RDV from './pages/RDV';
import Login from './pages/Login';
import AdminHome from './pages/AdminHome';
import Layout from './components/Layout/Layout';
import Shop from './pages/Shop';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import OrderCompleted from './pages/OrderCompleted';
import AppRouter from './router';
import 'antd/dist/antd.min.css'
import './styles/App.scss';

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
    id: 'orders',
    label: 'general.orders',
    path: '/order/:id',
    element: OrderCompleted
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
  return (
    <PayPalScriptProvider options={{ 'client-id': process.env.REACT_APP_PP_CLIENT_ID as string, 'currency': 'CAD' }} >
      <Layout>
        <AppRouter />
      </Layout>
    </PayPalScriptProvider>
  );
}

export default App;
