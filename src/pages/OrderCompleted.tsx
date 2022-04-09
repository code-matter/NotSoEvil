import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useParams } from 'react-router-dom'
import ShopItem from '../components/ShopItem'
import { ADMIN } from '../constants/selects'
import { OrdersService } from '../services/orders.services'

export interface IOrderCompleted {

}

const OrderCompleted = ({ }: IOrderCompleted) => {
  const { id } = useParams()
  // const { details, items } = location.state
  const [items, setItems] = useState<any>([])
  const [details, setDetails] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const { t } = useTranslation()

  useEffect(() => {
    const fetchOrder = async () => {
      if (id) {
        const order: any = await OrdersService.get(id)
        if (order && order.orderDetails) {
          setItems(order.orderDetails.items)
          setDetails(order.orderDetails.details)
        }
        setLoading(false)
      }
    }
    fetchOrder()
    return () => {
      setItems([])
      setDetails({})
    }
  }, [id])

  return (
    <div className="shop container">
      {!loading &&
        <div className="shop-order-summary">
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
                        <p>{t(ADMIN.RARITY.find(r => r.id === item.rarity)?.label as string).toUpperCase()}</p>
                        <p>{item.type}</p>
                        <p>{t(ADMIN.SIZE.find(s => s.id === item.size)?.label as string)}</p>
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
              <h1>Livré à:</h1>
              <div className="adress">
                <h4>{details.purchase_units[0].shipping.name.full_name}</h4>
                <h4>{details.purchase_units[0].shipping.address.address_line_1}, {details.purchase_units[0].shipping.address.postal_code}</h4>
                <h4>{details.purchase_units[0].shipping.address.admin_area_2}, {details.purchase_units[0].shipping.address.admin_area_1}, {details.purchase_units[0].shipping.address.country_code}</h4>
              </div>
            </div>
          </div>
        </div>}
    </div >
  )
}

export default OrderCompleted