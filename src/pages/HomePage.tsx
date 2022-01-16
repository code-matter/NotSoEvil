import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import EvilHeader from '../components/EvilHeader'

interface IHovered {
  id: string,
  color: string
}

export const RANDOM_COLORS = ['#E1C3FF', '#15B7FF', '#2DE4D1', '#FACD01']

const HomePage: React.FC = () => {
  const isMobile = window.innerWidth < 500;

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
      <EvilHeader />
      <div className='text'>
        <p>TATTOOS & {isMobile && <br />} PLENTY MORE</p>
        <h3 >D’LA <span className='teal'>COULEUR</span> PI BEN <br />
          D’LA <span className='mauve'>BONNE HUMEUR</span></h3>
      </div>
      <div className='homepage-links' >
        <Link className={`${hovered.id === 'rdv' ? 'hovered' : ''}`}
          style={{
            backgroundColor: hovered.id === 'rdv' ? hovered.color : '',
            outline: hovered.id === 'rdv' ? `1px solid ${hovered.color}` : ''
          }}
          id='rdv'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          to="/form">RENDEZ-VOUS</Link>
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
          to="/shop">SHOP</Link>
        <Link className={`${hovered.id === 'plus' ? 'hovered' : ''} disabled`}
          style={{
            backgroundColor: hovered.id === 'plus' ? hovered.color : '',
            outline: hovered.id === 'plus' ? `1px solid ${hovered.color}` : ''
          }}
          id='plus'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          to="/plus">PLUS PLUS PLUS</Link>
      </div>
    </div>
  )
}

export default HomePage
