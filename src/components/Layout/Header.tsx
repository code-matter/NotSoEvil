import i18next from 'i18next';
import React, { useContext } from 'react'
import { BsArrowLeft } from 'react-icons/bs';
import { useMatch, useNavigate } from 'react-router-dom';
import { USER_KEYS } from '../../constants/reducerKeys';
import { UserContext } from '../../context/UserContext';

export interface IHeader {

}

const Header = ({ }: IHeader) => {
  const isHome = useMatch('/');
  const isAdminHome = useMatch('/admin/home');
  const isAdminLogin = useMatch('/admin/login')
  const navigate = useNavigate()
  const userContext = useContext(UserContext)

  return (
    <div className='language-container'>
      <span className="go-back-btn" onClick={() => isAdminLogin || isAdminHome ? navigate('/') : navigate(-1)}>
        {!isHome ? <BsArrowLeft color='#ff7a9f' size={24} /> : <></>}
      </span>
      <div className="languages">
        <p className={userContext?.state?.language === "fr" ? 'active' : 'inactive'}
          onClick={() => {
            i18next.changeLanguage('fr')
            userContext.dispatch({ type: USER_KEYS.SET_LANGUAGE, payload: 'fr' })
          }}>FR</p>
        <span className="spacer" onClick={() => navigate('admin/home')}></span>
        <p className={userContext?.state?.language === "en" ? 'active' : 'inactive'}
          onClick={() => {
            i18next.changeLanguage('en')
            userContext.dispatch({ type: USER_KEYS.SET_LANGUAGE, payload: 'en' })
          }}>EN</p>
      </div>
    </div>
  )
}

export default Header