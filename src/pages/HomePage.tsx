import React, { MouseEvent, MouseEventHandler, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import EvilHeader from '../components/EvilHeader'
import Joy from '../components/Joy'
import fraise from '../assets/fraise.png'
import chien from '../assets/chien.png'
import lapinvert from '../assets/lapinvert.png'
import lapinjaune from '../assets/lapinjaune.png'
import lapinbleu from '../assets/lapinbleu.png'
import { ReactComponent as COUCOU } from '../assets/Smiley.svg'
import { useTranslation } from 'react-i18next'
import Modal from '../components/UI/Modal'
import { UserContext } from '../context/UserContext'
import i18next from 'i18next'
import { USER_KEYS } from '../constants/reducerKeys'
import { getColor } from '../utils/colors'
export interface IHovered {
  id: string,
  color: string
}

const HomePage: React.FC = () => {
  const isMobile = window.innerWidth < 500;
  const { t } = useTranslation();
  const [hovered, setHovered] = useState<IHovered>({ id: '', color: '' })

  const handleMouseEnter = (event: MouseEvent) => {
    setHovered({
      id: (event.target as HTMLElement)?.id,
      color: getColor()
    })
  }
  const handleMouseLeave = () => {
    setHovered({ id: '', color: '' })
  }

  const [showModal, setShowModal] = useState(false)
  const userContext = useContext(UserContext);

  useEffect(() => {
    const hasRead = sessionStorage.getItem('hasRead')
    if (!hasRead) {
      setShowModal(true)
    } else {
      setShowModal(false)
    }
  }, [])


  return (
    <div className='homepage'>
      <Link className="login" to='/admin/home'>TEST</Link>
      {showModal &&
        <Modal onClose={() => {
          setShowModal(false)
          sessionStorage.setItem('hasRead', '1')
        }} backdropClose smiley>
          <div className="construction-modal">
            <COUCOU onClick={() => setShowModal(false)} />
            <h2>{t('modal.hey')}</h2>

            <p>{t('modal.1st_para')}</p>
            <p>{t('modal.2nd_para')}{' '}
            </p>
            <a
              href="mailto: notsoevil.ink@gmail.com?subject=[DEMANDE D'INFO]">
              notsoevil.ink@gmail.com
            </a>
          </div>
        </Modal>}

      <section className='top'>
        <div className='languages'>
          <p className={userContext?.state?.language === "fr" ? 'active' : 'inactive'}
            onClick={() => {
              i18next.changeLanguage('fr')
              userContext.dispatch({ type: USER_KEYS.SET_LANGUAGE, payload: 'fr' })
            }}>FR</p>
          <p className='separator'>|</p>
          {/* <span className="spacer"></span> */}
          <p className={userContext?.state?.language === "en" ? 'active' : 'inactive'}
            onClick={() => {
              i18next.changeLanguage('en')
              userContext.dispatch({ type: USER_KEYS.SET_LANGUAGE, payload: 'en' })
            }}>EN</p>
        </div>
        <EvilHeader />
        <div className='text'>
          <p>TATTOOS & {isMobile && <br />} PLENTY MORE</p>
          <h3 >D'LA <span className='teal'>COULEUR</span> PI BEN <br />
            D'LA <span className='mauve'>BONNE HUMEUR</span></h3>
        </div>
        <div className='homepage-links' >
          <Link className={`${hovered.id === 'rdv' ? 'hovered' : ''} `}
            id='rdv'
            to="/form"
            style={{
              backgroundColor: hovered.id === 'rdv' ? hovered.color : '',
              outline: hovered.id === 'rdv' ? `1px solid ${hovered.color}` : ''
            }}
            onMouseEnter={handleMouseEnter as MouseEventHandler}
            onMouseLeave={handleMouseLeave as MouseEventHandler}
          >
            {t('general.rdv')}
          </Link>
          <Link className={`${hovered.id === 'flash' ? 'hovered' : ''} `}
            id='flash'
            to="/flash"
            style={{
              backgroundColor: hovered.id === 'flash' ? hovered.color : '',
              outline: hovered.id === 'flash' ? `1px solid ${hovered.color}` : ''
            }}
            onMouseEnter={handleMouseEnter as MouseEventHandler}
            onMouseLeave={handleMouseLeave as MouseEventHandler}
          >
            FLASH
          </Link>
          <Link className={`${hovered.id === 'shop' ? 'hovered' : ''}  `}
            id='shop'
            to="/shop"
            style={{
              backgroundColor: hovered.id === 'shop' ? hovered.color : '',
              outline: hovered.id === 'shop' ? `1px solid ${hovered.color}` : ''
            }}
            onMouseEnter={handleMouseEnter as MouseEventHandler}
            onMouseLeave={handleMouseLeave as MouseEventHandler}
          >
            {t('general.shop')}
          </Link>
          <Link className={`${hovered.id === 'plus' ? 'hovered' : ''} `}
            id='plus'
            to="/plus"
            style={{
              backgroundColor: hovered.id === 'plus' ? hovered.color : '',
              outline: hovered.id === 'plus' ? `1px solid ${hovered.color}` : ''
            }}
            onMouseEnter={handleMouseEnter as MouseEventHandler}
            onMouseLeave={handleMouseLeave as MouseEventHandler}
          >
            {t('general.moremoremore')}
          </Link>
        </div>
      </section >
      {/* <section className='joy'>
        <Joy />
      </section> */}
      {/* <section className='rabbits-photos'>
        <div className='photos-container'>
          <img className='top-left' src={fraise} alt="" />
          <div className='rabbits-tr'>
            <img className='top-right-b' src={lapinbleu} alt="" />
            <img className='top-right-g' src={lapinvert} alt="" />
          </div>
        </div>
        <div className='photos-container'>
          <img className='bottom-left' src={lapinjaune} alt="" />
          <img className='bottom-right' src={chien} alt="" />
        </div>
      </section> */}
    </div>
  )
}

export default HomePage
