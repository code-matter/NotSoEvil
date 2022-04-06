import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import ShopItem from '../components/ShopItem'
import { OrdersService } from '../services/orders.services'

export interface IOrderCompleted {

}

const OrderCompleted = ({ }: IOrderCompleted) => {
  const { id } = useParams()
  // const { details, items } = location.state
  const [items, setItems] = useState<any>()
  const [details, setDetails] = useState<any>({})

  const fetchOrder = async () => {
    if (id) {
      const order: any = await OrdersService.get(id)
      if (order && order.orderDetails) {
        setItems(order.orderDetails.items)
        setDetails(order.orderDetails.details)
      }
    }
  }
  useEffect(() => {
    fetchOrder()

    // return () => {
    //   second
    // }
  }, [id])


  return (
    <div className="shop container">
      {items && details && <div className="shop-order-summary">
        <div className="left">
          <p>Order Summary</p>
          <h1>{details.id}</h1>
          <div className="order-items">
            {items.map((item: any, itemIdx: any) => {
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
          <div className="total-info">
            <h1>Total</h1>
            <div className="order-items">
              <div className="infos-title">
                <h2>Subtotal</h2>
                <h2>{items.length > 1 ?
                  items.reduce(
                    (prev: any, next: any) => prev + Number(next.price), 0).toFixed(2) :
                  Number(items[0].price).toFixed(2)} $
                </h2>
              </div>
              <div className="infos-title">
                <h2>Taxes</h2>
                <h2>{items.length > 1 ?
                  (items.reduce(
                    (prev: any, next: any) =>
                      prev + Number(next.price), 0) * 0.15).toFixed(2) :
                  (Number(items[0].price) * 0.15).toFixed(2)} $
                </h2>
              </div>
              <div className="infos-title">
                <h2>Shipping</h2>
                <h2>5.00 $</h2>
              </div>
              <div className="infos-title">
                <h2>Total</h2>
                <h2>{items.length > 1 ?
                  (5 + items.reduce(
                    (prev: any, next: any) =>
                      prev + Number(next.price), 0) + items.reduce(
                        (prev: any, next: any) =>
                          prev + Number(next.price), 0) * 0.15).toFixed(2) :
                  (5 + (Number(items[0].price)) * 1.15).toFixed(2)} $
                </h2>
              </div>
            </div>
          </div>
          <div className="adress-info">
            ADRESS STUFF HERE
          </div>
        </div>
      </div>}
    </div >
  )
}

export default OrderCompleted