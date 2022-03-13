import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { USER_KEYS } from '../constants/reducerKeys'
import { UserContext } from '../context/UserContext'
import { getColor } from '../utils/colors'

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
  const userContext = useContext(UserContext)

  const handleAddItem = () => {
    userContext.dispatch({ type: USER_KEYS.ADD_ITEMS, payload: id })
    userContext.dispatch({ type: USER_KEYS.SET_FEEDBACK, payload: id })
    setTimeout(() => userContext.dispatch({ type: USER_KEYS.SET_FEEDBACK, payload: undefined }), 2500)
  }

  return (
    <div className={`shop-items ${!available ? 'sold' : ''}`}
      onMouseEnter={() => setIsHovered({ color: getColor(), hovered: true })}
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
            onClick={available ? handleAddItem : undefined}
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