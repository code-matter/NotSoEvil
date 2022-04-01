import i18next from 'i18next';
import { useContext, useEffect, useRef, useState } from 'react'
import { Link, useLocation, useMatch, useNavigate } from 'react-router-dom';
import { USER_KEYS } from '../../constants/reducerKeys';
import { UserContext } from '../../context/UserContext';
import { ReactComponent as CART } from '../../assets/Vector.svg'
import { ReactComponent as LOGO } from '../../assets/EvilCurrent.svg'
import { useTranslation } from 'react-i18next';
import { getPastelColor } from '../../utils/colors';
import { AnimatePresence, motion } from 'framer-motion'
import ReactDOM from "react-dom";
import Feedback from '../UI/Feedback';
import useMobile from '../../hooks/useMobile';
import Draggable from 'react-draggable';
import { ReactComponent as NAV } from '../../assets/Smiley.svg'
import { Turn } from 'hamburger-react'
import { HiArrowNarrowLeft } from "react-icons/hi";
export interface IHeader {

}
const portalEl = document.getElementById("overlays");

const Header = ({ }: IHeader) => {
  const navigate = useNavigate()
  const userContext = useContext(UserContext)
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const isAdmin = useMatch('/admin/*')
  const { isMobile } = useMobile()
  const navRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [navColor, setNavColor] = useState('')

  const handleOpenCart = () => {
    userContext.dispatch({ type: USER_KEYS.TOGGLE_CART })
  }

  console.log('isMobile', isMobile)
  useEffect(() => {
    setNavColor(getPastelColor())
    return () => {
      setNavColor('')
    }
  }, [isOpen])


  return (
    <>
      {ReactDOM.createPortal(
        <AnimatePresence>
          {userContext?.state?.feedback &&
            <Feedback>
              <h1>
                {userContext?.state?.feedback} {t('shop.added')}
              </h1>
            </Feedback>}
        </AnimatePresence>
        , portalEl as HTMLElement)}
      {
        !isAdmin &&
        <div className={`header-wrap ${isMobile ? 'mobile' : ''} ${isOpen ? 'opened' : ''}`} style={{ backgroundColor: getPastelColor() }}>

          <div className="header-content" onClick={isMobile ? () => setIsOpen(!isOpen) : undefined}>
            {isOpen ? <HiArrowNarrowLeft color="#fbfbfd" size={30} onClick={() => navigate('/')} /> : <LOGO className="logo" onClick={isMobile ? undefined : () => navigate('/')} />}
            {isMobile && <Turn toggled={isOpen} size={isOpen ? 30 : 20} color="#fbfbfd" />}
          </div>

          {isMobile && isOpen &&
            <div className='links'>
              <Link className={`${pathname === "/form" ? 'on-page' : ''} `}
                to="/form">
                {t('general.rdv')}
              </Link>
              <Link className={`${pathname === "/flash" ? 'on-page' : ''}`}
                to="/flash">
                FLASH
              </Link>
              <Link className={`${pathname === "/shop" ? 'on-page' : ''} `}
                to="/shop">
                {t('general.shop')}
              </Link>
              <Link className={`${pathname === "/more" ? 'on-page' : ''}`}
                to="/more">
                {t('general.moremoremore')}
              </Link>
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
                <CART className={`cart ${userContext.state.items.length === 0 ? 'disabled' : ''}`} onClick={userContext.state.items.length > 0 ? handleOpenCart : undefined} />
                <p className='cart-qty' onClick={userContext.state.items.length > 0 ? handleOpenCart : undefined}>{userContext?.state.items?.length}</p>
              </div>
            </div>}





          {!isMobile &&
            <div className='links'>
              <Link className={`${pathname === "/form" ? 'on-page' : ''} `}
                to="/form">
                {t('general.rdv')}
              </Link>
              <Link className={`${pathname === "/flash" ? 'on-page' : ''}`}
                to="/flash">
                FLASH
              </Link>
              <Link className={`${pathname === "/shop" ? 'on-page' : ''} `}
                to="/shop">
                {t('general.shop')}
              </Link>
              <Link className={`${pathname === "/more" ? 'on-page' : ''}`}
                to="/more">
                {t('general.moremoremore')}
              </Link>
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
                <CART className={`cart ${userContext.state.items.length === 0 ? 'disabled' : ''}`} onClick={userContext.state.items.length > 0 ? handleOpenCart : undefined} />
                <p className='cart-qty' onClick={userContext.state.items.length > 0 ? handleOpenCart : undefined}>{userContext?.state.items?.length}</p>
              </div>
            </div>}
        </div>
      }
    </>
  )
}

export default Header