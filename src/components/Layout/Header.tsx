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
import { Turn as Hamburger, Turn } from 'hamburger-react'
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
        !isAdmin && !isMobile ?
          <div className='header-wrap' style={{ backgroundColor: getPastelColor() }}>
            <LOGO className="logo" onClick={() => navigate('/')} />
            <div className='links'>
              <Link className={`${pathname === "/form" ? 'on-page' : ''} disabled`}
                to="/form">
                {t('general.rdv')}
              </Link>
              <Link className={`${pathname === "/flash" ? 'on-page' : ''}`}
                to="/flash">
                FLASH
              </Link>
              <Link className={`${pathname === "/shop" ? 'on-page' : ''} disabled`}
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
            </div>
          </div>
          :
          // <Draggable nodeRef={navRef}>
          <AnimatePresence >
            <span className={`hamburger`} style={{ backgroundColor: isOpen ? 'unset' : navColor, boxShadow: isOpen ? 'unset' : '' }}>
              <Turn toggled={isOpen} toggle={() => setIsOpen(!isOpen)} color="#fbfbfd"
              />
            </span>
            {isOpen && <motion.div className={`header-wrap mobile ${isOpen ? 'opened' : ''}`}
              key='mobile-nav'
              style={{ backgroundColor: navColor }}
              ref={navRef}
              initial={{ y: '-5vh', x: '20vw', opacity: 0 }}
              animate={{ y: 0, x: 0, opacity: 1 }}
              transition={{
                type: "spring",
                damping: 30,
                mass: 1,
                stiffness: 420,
              }}
              exit={{ y: '-20vh', x: '100vw', }}
            >
              {/* <NAV /> */}
              <motion.div className='links'
              >
                <Link className={`${pathname === "/form" ? 'on-page' : ''} `}
                  onClick={() => setIsOpen(false)} to="/form">
                  {t('general.rdv')}
                </Link>
                <Link className={`${pathname === "/flash" ? 'on-page' : ''}`}
                  onClick={() => setIsOpen(false)} to="/flash">
                  FLASH
                </Link>
                <Link className={`${pathname === "/shop" ? 'on-page' : ''} `}
                  onClick={() => setIsOpen(false)} to="/shop">
                  {t('general.shop')}
                </Link>
                <Link className={`${pathname === "/more" ? 'on-page' : ''}`}
                  onClick={() => setIsOpen(false)} to="/more">
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
              </motion.div>

            </motion.div>}
          </AnimatePresence>
        // </Draggable>
      }
    </>
  )
}

export default Header