import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RANDOM_COLORS } from '../pages/HomePage'
import Card from './UI/Card'

export interface IShopItem {
  id: string,
  image: string,
  size: string,
  price: number,
  type: string,
  rarity: string
}

const ShopItem = ({
  id,
  image,
  size,
  price,
  rarity,
  type
}: IShopItem) => {
  const [isHovered, setIsHovered] = useState(false)
  const { t } = useTranslation()
  return (
    <div className="shop-items"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className="item-img" >
        <img src={image} alt={image} />
        {isHovered && <p className="shop-seemore" style={{
          backgroundColor: isHovered ?
            RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)] + '67' : '',
        }}>{t('shop.see_more')}</p>}
      </div>
      <div>
        <p className="item-title">{id}</p>
        <p className="item-info">{type} | {size}</p>
        <p className="item-rarity">{rarity.toUpperCase()}</p>
      </div>
    </div>
  )
}

export default ShopItem