import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { USER_KEYS } from '../constants/reducerKeys'
import { UserContext } from '../context/UserContext'
import { accentColor } from '../utils/colors'

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
  const [imgHovered, setImgHovered] = useState(false)
  const [btnHovered, setBtnHovered] = useState(false)
  const [color, setColor] = useState(accentColor())
  const { t } = useTranslation()
  const userContext = useContext(UserContext)

  const handleAddItem = () => {
    userContext.dispatch({
      type: USER_KEYS.ADD_ITEMS, payload: {
        id,
        image,
        size,
        price,
        rarity,
        available,
        type
      }
    })
    userContext.dispatch({ type: USER_KEYS.SET_FEEDBACK, payload: id })
    setTimeout(() => userContext.dispatch({ type: USER_KEYS.SET_FEEDBACK, payload: undefined }), 1500)
  }

  return (
    <div className={`shop-items ${!available ? 'sold' : ''}`}>
      <div className="item-img"
        onMouseEnter={() => {
          if (!color)
            setColor(accentColor())
          setImgHovered(true)
        }}
        onMouseLeave={() => {
          setColor('')
          setImgHovered(false)
        }}>
        <img src={image} alt={image} />
        {imgHovered && <p className="shop-seemore" style={{
          backgroundColor: imgHovered && color ?
            color + '67' : '',
        }}>{t('shop.see_more')}</p>}
      </div>
      <>
        <div className="item-title">
          <h1>{id}</h1>
          <h1>{price} $</h1>
        </div>
        <p className="item-info">{type} | {size}</p>
        <p className="item-rarity">
          <span>{rarity.toUpperCase()}</span>
          <span
            className='buy-btn'
            onClick={available ? handleAddItem : undefined}
            onMouseEnter={() => {
              if (!color)
                setColor(accentColor())
              setBtnHovered(true)
            }}
            onMouseLeave={() => {
              setColor('')
              setBtnHovered(false)
            }}
            style={{
              color: color && btnHovered ? color : ''
            }}>{t('shop.want_it')}
          </span>
        </p>
      </>
    </div>
  )
}

export default ShopItem