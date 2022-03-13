import i18next from 'i18next';
import { useContext } from 'react'
import { Link, useLocation, useMatch, useNavigate } from 'react-router-dom';
import { USER_KEYS } from '../../constants/reducerKeys';
import { UserContext } from '../../context/UserContext';
import { ReactComponent as CART } from '../../assets/Vector.svg'
import { ReactComponent as LOGO } from '../../assets/EvilCurrent.svg'
import { useTranslation } from 'react-i18next';
import { getColor } from '../../utils/colors';
import { AnimatePresence, motion } from 'framer-motion'
import ReactDOM from "react-dom";
import Feedback from '../UI/Feedback';

export interface IHeader {

}
const portalEl = document.getElementById("overlays");

const Header = ({ }: IHeader) => {
  const navigate = useNavigate()
  const userContext = useContext(UserContext)
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const isAdmin = useMatch('/admin/*')


  return (
    <>
      {ReactDOM.createPortal(
        <AnimatePresence>
          {userContext?.state?.feedback &&
            <Feedback>
              {userContext?.state?.feedback} ajouté au panier!
            </Feedback>}
        </AnimatePresence>
        , portalEl as HTMLElement)}
      {
        !isAdmin &&
        <div className='header-wrap' style={{ backgroundColor: getColor() }}>
          <LOGO className="logo" onClick={() => navigate('/')} />
          <div className='links'>
            <Link className={`${pathname === "/rdv" ? 'on-page' : ''}`} to="/rdv">{t('general.rdv')}</Link>
            <Link className={`${pathname === "/flash" ? 'on-page' : ''}`} to="/flash">FLASH</Link>
            <Link className={`${pathname === "/shop" ? 'on-page' : ''}`} to="/shop">{t('general.shop')}</Link>
            <Link className={`${pathname === "/more" ? 'on-page' : ''}`} to="/more">{t('general.moremoremore')}</Link>
            <div className="languages-container">
              <div className='languages'>
                <p className={userContext?.state?.language === "fr" ? 'active' : 'inactive'}
                  onClick={() => {
                    i18next.changeLanguage('fr')
                    userContext.dispatch({ type: USER_KEYS.SET_LANGUAGE, payload: 'fr' })
                  }}>FR</p>
                <p>|</p>
                <p className={userContext?.state?.language === "en" ? 'active' : 'inactive'}
                  onClick={() => {
                    i18next.changeLanguage('en')
                    userContext.dispatch({ type: USER_KEYS.SET_LANGUAGE, payload: 'en' })
                  }}>EN</p>
              </div>
              <CART className='cart' />
              <p>{userContext?.state.items?.length}</p>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Header