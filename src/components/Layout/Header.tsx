import i18next from 'i18next';
import { useContext } from 'react'
import { Link, useLocation, useMatch, useNavigate } from 'react-router-dom';
import { USER_KEYS } from '../../constants/reducerKeys';
import { UserContext } from '../../context/UserContext';
import { ReactComponent as CART } from '../../assets/Vector.svg'
import { ReactComponent as LOGO } from '../../assets/EvilCurrent.svg'
import { useTranslation } from 'react-i18next';
import { RANDOM_COLORS_PASTELS } from '../../pages/HomePage';

export interface IHeader {

}

const Header = ({ }: IHeader) => {
  const navigate = useNavigate()
  const userContext = useContext(UserContext)
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const isAdmin = useMatch('/admin/*')


  return (
    <>
      {
        !isAdmin &&
        <div className='header-wrap' style={{ backgroundColor: RANDOM_COLORS_PASTELS[Math.floor(Math.random() * RANDOM_COLORS_PASTELS.length)] }}>
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
                {/* <span className="spacer"></span> */}
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