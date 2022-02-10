import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import EvilHeader from '../components/EvilHeader'
import Joy from '../components/Joy'
import fraise from '../assets/fraise.png'
import chien from '../assets/chien.png'
import lapinvert from '../assets/lapinvert.png'
import lapinjaune from '../assets/lapinjaune.png'
import lapinbleu from '../assets/lapinbleu.png'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'

interface IHovered {
  id: string,
  color: string
}

export const RANDOM_COLORS = ['#E1C3FF', '#15B7FF', '#2DE4D1', '#FACD01']

export const toggleLocale = () => {
  i18next.changeLanguage(i18next.language === "fr" ? "en" : "fr");
};

const HomePage: React.FC = () => {
  const isMobile = window.innerWidth < 500;
  const { t } = useTranslation();
  const [hovered, setHovered] = useState<IHovered>({ id: '', color: '' })

  const handleMouseEnter = (event: any) => { // Need to fix TYPES
    setHovered({
      id: event.target?.id,
      color: RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)]
    })
  }
  const handleMouseLeave = (event: any) => { // Need to fix TYPES
    setHovered({ id: '', color: '' })
  }


  return (
    <div className='homepage container'>
      <button style={{ position: 'absolute', zIndex: 999, top: 0, left: 0 }} onClick={toggleLocale}>{t('general.language')}</button>
      <section className='top'>
        <EvilHeader />
        <div className='text'>
          <p>TATTOOS & {isMobile && <br />} PLENTY MORE</p>
          <h3 >D’LA <span className='teal'>COULEUR</span> PI BEN <br />
            D’LA <span className='mauve'>BONNE HUMEUR</span></h3>
        </div>
        <div className='homepage-links' >
          <Link className={`${hovered.id === 'rdv' ? 'hovered' : ''} disabled`}
            style={{
              backgroundColor: hovered.id === 'rdv' ? hovered.color : '',
              outline: hovered.id === 'rdv' ? `1px solid ${hovered.color}` : ''
            }}
            id='rdv'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            to="/form">{t('general.rdv')}</Link>
          <Link className={`${hovered.id === 'flash' ? 'hovered' : ''} disabled`}
            style={{
              backgroundColor: hovered.id === 'flash' ? hovered.color : '',
              outline: hovered.id === 'flash' ? `1px solid ${hovered.color}` : ''
            }}
            id='flash'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            to="/flash">FLASH</Link>
          <Link className={`${hovered.id === 'shop' ? 'hovered' : ''} disabled`}
            style={{
              backgroundColor: hovered.id === 'shop' ? hovered.color : '',
              outline: hovered.id === 'shop' ? `1px solid ${hovered.color}` : ''
            }}
            id='shop'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            to="/shop">{t('general.shop')}</Link>
          <Link className={`${hovered.id === 'plus' ? 'hovered' : ''} disabled`}
            style={{
              backgroundColor: hovered.id === 'plus' ? hovered.color : '',
              outline: hovered.id === 'plus' ? `1px solid ${hovered.color}` : ''
            }}
            id='plus'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            to="/plus">{t('general.moremoremore')}</Link>
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
