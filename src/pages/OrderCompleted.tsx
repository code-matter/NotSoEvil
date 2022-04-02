import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ShopItem from '../components/ShopItem'

export interface IOrderCompleted {

}

const OrderCompleted = ({ }: IOrderCompleted) => {
  const location: any = useLocation()
  const [order, setOrder] = useState<any>({})
  useEffect(() => {
    if (location) {
      console.log('location.state', location.state)
      setOrder(location.state)
    }
  }, [location])

  return (
    <div className="shop container">
      {order && order.details && <div className="shop-order-summary">
        <div className="left">
          <p>Order Summary</p>
          <h1>{order.details.id}</h1>
          <div className="order-items">
            {order.items.map((item: any, itemIdx: any) => {
              return (
                <div className="shop-order-view" key={item.id + itemIdx}>
                  <img src={item.image} alt={item.image} />
                  <div className="shop-order-infos">
                    <div className="infos-title">
                      <h1>{item.id}</h1>
                      <h1>{item.price} $</h1>
                    </div>
                    <div className="infos-title description">
                      <p>{item.rarity.toUpperCase()}</p>
                      <p>{item.type}</p>
                      <p>{item.size}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="right">
          <p>Details</p>
          <h1>Total</h1>
          <div className="order-items">
            <div className="infos-title">
              <h2>Subtotal</h2>
              <h2>{order.items.reduce((prev: any, next: any) => prev + next.price, 0).toFixed(2)} $</h2>
            </div>
            <div className="infos-title">
              <h2>Taxes</h2>
              <h2>{(order.items.reduce((prev: any, next: any) => prev + next.price, 0) * 0.15).toFixed(2)} $</h2>
            </div>
            <div className="infos-title">
              <h2>Shipping</h2>
              <h2>5.00 $</h2>
            </div>
            <div className="infos-title">
              <h2>Total</h2>
              <h2>{(5 + order.items.reduce((prev: any, next: any) => prev + next.price, 0) + order.items.reduce((prev: any, next: any) => prev + next.price, 0) * 0.15).toFixed(2)} $</h2>
            </div>
          </div>
        </div>
      </div>}
    </div >
  )
}

export default OrderCompleted