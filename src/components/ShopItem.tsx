import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { USER_KEYS } from '../constants/reducerKeys'
import { ADMIN } from '../constants/selects'
import { UserContext } from '../context/UserContext'
import { accentColor } from '../utils/colors'
import Modal from './UI/Modal'
import SquareButton from './UI/SquareButton'

export interface IShopItem {
  id: string,
  name: string,
  image: string,
  size: number,
  price: number,
  type: string,
  rarity: number,
  available: boolean,
  description?: string,
}

const ShopItem = ({
  id,
  name,
  image,
  size,
  price,
  rarity,
  available,
  type,
  description
}: IShopItem) => {
  const [imgHovered, setImgHovered] = useState(false)
  const [btnHovered, setBtnHovered] = useState(false)
  const [infoOpened, setInfoOpened] = useState(false)
  const [color, setColor] = useState(accentColor())
  const { t } = useTranslation()
  const userContext = useContext(UserContext)

  const handleAddItem = () => {
    userContext.dispatch({
      type: USER_KEYS.ADD_ITEMS, payload: {
        id,
        name,
        image,
        size,
        price,
        rarity,
        available,
        type
      }
    })
    userContext.dispatch({ type: USER_KEYS.SET_FEEDBACK, payload: name })
    setTimeout(() => userContext.dispatch({ type: USER_KEYS.SET_FEEDBACK, payload: undefined }), 1500)
    if (infoOpened) {
      setInfoOpened(false)
    }
  }

  return (
    <div className={`shop-items ${userContext.state.items.find((item: any) => item.id === id) || !available ? 'sold' : ''}`}>
      {infoOpened &&
        <Modal onClose={() => setInfoOpened(false)} backdropColor="rgba(255,255,255,0.85)" >
          <div className='modal-shop' >
            <div className='modal-shop-img'>
              <img src={image} alt={image} />
            </div>
            <div className='modal-shop-info'>
              <h1>{name}</h1>
              <div>
                <p>{ADMIN.SIZE.find(s => s.id === size)?.label}</p>
                <p>{description}</p>
              </div>
              <div>
                <p>{t(ADMIN.RARITY.find(r => r.id === rarity)?.label as string).toUpperCase()}</p>
                <p>Collection Hiver</p>
              </div>
              <p className='price'>{price} $</p>
              <SquareButton label={t('shop.want_it')} onClick={available ? handleAddItem : undefined} />
            </div>
          </div>
        </Modal>}

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
        <img className='item-img' src={image} alt={image} />
        {imgHovered && <p className="shop-seemore"
          onClick={() => setInfoOpened(true)}
          style={{
            backgroundColor: imgHovered && color ?
              color + '67' : '',
          }}>{t('shop.see_more')}</p>}
      </div>
      <>
        <div className="item-title">
          <h1>{name}</h1>
          <h1>{price} $</h1>
        </div>
        <p className="item-info">{t(`${ADMIN.TYPE.find(s => s.id === Number(type))?.label}`)} | {ADMIN.SIZE.find(s => s.id === size)?.label}</p>
        <p className="item-rarity">
          <span>{t(ADMIN.RARITY.find(r => r.id === rarity)?.label as string).toUpperCase()}</span>
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
            }}>
            {available ? t('shop.want_it') : t('shop.sold')}
          </span>
        </p>
      </>
    </div>
  )
}

export default ShopItem