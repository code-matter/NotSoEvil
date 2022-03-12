import i18next from 'i18next';
import React, { useContext } from 'react'
import { BsArrowLeft } from 'react-icons/bs';
import { Link, useMatch, useNavigate } from 'react-router-dom';
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
  const isAdminHome = useMatch('/admin/home');
  const isAdminLogin = useMatch('/admin/login')
  const navigate = useNavigate()
  const userContext = useContext(UserContext)
  const { t } = useTranslation()

  return (

    <div className='language-container' style={{ backgroundColor: RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)] }}>
      {/* <span className="go-back-btn" onClick={() => isAdminLogin || isAdminHome ? navigate('/') : navigate(-1)}> */}
      {!isHome ? <LOGO className="go-back-btn" onClick={() => navigate('/')} /> : <></>}
      {/* </span> */}
      <Link to="/rdv">{t('general.rdv')}</Link>
      <Link to="/flash">FLASH</Link>
      <Link to="/shop">{t('general.shop')}</Link>
      <Link to="/moremoremore">{t('general.moremoremore')}</Link>

      <div className="languages-container">
        <div className='languages'>
          <p className={userContext?.state?.language === "fr" ? 'active' : 'inactive'}
            onClick={() => {
              i18next.changeLanguage('fr')
              userContext.dispatch({ type: USER_KEYS.SET_LANGUAGE, payload: 'fr' })
            }}>FR</p>
          <p>/</p>
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
  )
}

export default Header