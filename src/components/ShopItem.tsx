import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RANDOM_COLORS } from '../pages/HomePage'
import Card from './UI/Card'
import SquareButton from './UI/SquareButton'

export interface IShopItem {
  id: string,
  image: string,
  size: string,
  price: number,
  type: string,
  rarity: string,
  available: boolean
}

const ShopItem = ({
  id,
  image,
  size,
  price,
  rarity,
  available,
  type
}: IShopItem) => {
  const [isHovered, setIsHovered] = useState({ color: '', hovered: false })
  const { t } = useTranslation()
  return (
    <div className={`shop-items ${!available ? 'sold' : ''}`}
      onMouseEnter={() => setIsHovered({ color: RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)], hovered: true })}
      onMouseLeave={() => setIsHovered({ color: '', hovered: false })}>
      <div className="item-img" >
        <img src={image} alt={image} />
        {isHovered.hovered && <p className="shop-seemore" style={{
          backgroundColor: isHovered.hovered ?
            isHovered.color + '67' : '',
        }}>{t('shop.see_more')}</p>}
      </div>
      <>
        <p className="item-title"><span>{id}</span><span>{price} $</span></p>
        <p className="item-info">{type} | {size}</p>
        <p className="item-rarity">
          <span>{rarity.toUpperCase()}</span>
          <span
            className='buy-btn'
            onClick={available ? () => console.log('bought IT!') : undefined}
            style={{
              color: isHovered.hovered ?
                isHovered.color : '',
            }}>JE LE VEUX !
          </span>
        </p>
      </>
    </div>
  )
}

export default ShopItem