import React, { MouseEvent, MouseEventHandler, useEffect, useState } from 'react'
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
import Modal from '../UI/Modal'
export interface IHovered {
  id: string,
  color: string
}

export const RANDOM_COLORS = ['#E1C3FF', '#15B7FF', '#2DE4D1', '#FACD01']



const HomePage: React.FC = () => {
  const isMobile = window.innerWidth < 500;
  const { t } = useTranslation();
  const [hovered, setHovered] = useState<IHovered>({ id: '', color: '' })

  const handleMouseEnter = (event: MouseEvent) => {
    setHovered({
      id: (event.target as HTMLElement)?.id,
      color: RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)]
    })
  }

  const handleMouseLeave = () => {
    setHovered({ id: '', color: '' })
  }

  const [showModal, setShowModal] = useState(true)

  return (
    <div className='homepage container'>
      {showModal &&
        <Modal onClose={() => setShowModal(false)}>
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
        <EvilHeader />
        <div className='text'>
          <p>TATTOOS & {isMobile && <br />} PLENTY MORE</p>
          <h3 >D'LA <span className='teal'>COULEUR</span> PI BEN <br />
            D'LA <span className='mauve'>BONNE HUMEUR</span></h3>
        </div>
        <div className='homepage-links' >
          <Link className={`${hovered.id === 'rdv' ? 'hovered' : ''} disabled`}
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
          <Link className={`${hovered.id === 'flash' ? 'hovered' : ''} disabled`}
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
          <Link className={`${hovered.id === 'shop' ? 'hovered' : ''} disabled`}
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
          <Link className={`${hovered.id === 'plus' ? 'hovered' : ''} disabled`}
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
