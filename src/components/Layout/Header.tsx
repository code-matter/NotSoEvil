import i18next from 'i18next';
import React, { useContext } from 'react'
import { BsArrowLeft } from 'react-icons/bs';
import { Link, useLocation, useMatch, useNavigate } from 'react-router-dom';
import { USER_KEYS } from '../../constants/reducerKeys';
import { UserContext } from '../../context/UserContext';
import { ReactComponent as CART } from '../../assets/Vector.svg'
import { ReactComponent as LOGO } from '../../assets/EvilCurrent.svg'
import { routes } from '../../App';
import { useTranslation } from 'react-i18next';
import { RANDOM_COLORS } from '../../pages/HomePage';

export interface IHeader {

}

const Header = ({ }: IHeader) => {
  const isHome = useMatch('/');
  const navigate = useNavigate()
  const userContext = useContext(UserContext)
  const { t } = useTranslation()
  const { pathname } = useLocation()

  return (

    <div className='header-wrap' style={{ backgroundColor: RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)] }}>
      {!isHome ? <LOGO className="logo" onClick={() => navigate('/')} /> : <></>}
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
            {/* <span className="spacer"></span> */}
            <p className={userContext?.state?.language === "en" ? 'active' : 'inactive'}
              onClick={() => {
                i18next.changeLanguage('en')
                userContext.dispatch({ type: USER_KEYS.SET_LANGUAGE, payload: 'en' })
              }}>EN</p>
          </div>
          <CART className='cart' />
        </div>
      </div>
    </div>
  )
}

export default Header