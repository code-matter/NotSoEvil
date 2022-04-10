import React from 'react'
import { MdDashboard, MdShoppingCart, MdPaid } from "react-icons/md";

export interface IAdminHeader {

}

export const LINKS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    to: '/admin/dashboard',
    icon: MdDashboard
  },
  {
    id: 'shop',
    label: 'Shop Management',
    to: '/admin/shop',
    icon: MdShoppingCart
  },
  {
    id: 'order',
    label: 'Orders',
    to: '/admin/orders',
    icon: MdPaid
  },
]

const AdminHeader = ({ }: IAdminHeader) => {



  return (
    <div className="admin-header ">
      {LINKS.map((link: any) => {
        return (
          <link.icon />
        )
      })}
    </div>
  )
}

export default AdminHeader