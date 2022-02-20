import React from 'react'
import ShopItem from '../components/ShopItem'
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

export interface IShop {
}

const DUMMY_DATA = [
  {
    id: '111',
    price: 50,
    size: '11 x 17',
    image: '/chien.png'
  }, {
    id: '112',
    price: 22,
    size: '11 x 17',
    image: '/fraise.png'
  }, {
    id: '113',
    price: 13.44,
    size: '11 x 17',
    image: '/lapinbleu.png'
  },
  {
    id: '114',
    price: 8,
    size: '11 x 17',
    image: '/lapinjaune.png'
  },
  {
    id: '115',
    price: 111.22,
    size: '11 x 17',
    image: '/lapinvert.png'
  },
  {
    id: '116',
    price: 50,
    size: '11 x 17',
    image: '/chien.png'
  }, {
    id: '117',
    price: 22,
    size: '11 x 17',
    image: '/fraise.png'
  }, {
    id: '118',
    price: 13.44,
    size: '11 x 17',
    image: '/lapinbleu.png'
  },
  {
    id: '119',
    price: 8,
    size: '11 x 17',
    image: '/lapinjaune.png'
  },
  {
    id: '120',
    price: 111.22,
    size: '11 x 17',
    image: '/lapinvert.png'
  }
]

const Shop = ({ }: IShop) => {
  let navigation = useNavigate()
  return (
    <div className='shop-container'>
      <span className="go-back-btn" onClick={() => navigation('/')}>
        <BsArrowLeft color='#ff7a9f' size={24} />
      </span>
      {DUMMY_DATA.map((flash, idx) => {
        return (
          <ShopItem
            id={flash.id}
            image={flash.image}
            size={flash.size}
            price={flash.price} />
        )
      })}
    </div>
  )
}

export default Shop