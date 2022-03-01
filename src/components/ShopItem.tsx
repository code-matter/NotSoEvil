import React from 'react'
import Card from './UI/Card'

export interface IShopItem {
  id: string,
  image: string,
  size: string,
  price: number
}

const ShopItem = ({
  id,
  image,
  size,
  price
}: IShopItem) => {
  return (
    <>
      <h2>{id}</h2>
      <img className="item-img" src={image} alt={image} />
      <div>
        Size:{size}
        Price: {price}
      </div>
    </>
  )
}

export default ShopItem