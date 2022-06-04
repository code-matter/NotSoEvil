import React, { useState } from 'react'
import { MdDashboard, MdShoppingCart, MdPaid } from "react-icons/md";
import { Link } from 'react-router-dom';

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

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`admin-header${isOpen ? ' navOpened' : ''}`}>
      <p onClick={() => setIsOpen(!isOpen)} >X</p>
      <div className="admin-links">
        {LINKS.map((link: any) => {
          return (
            <Link to={link.to}>
              <link.icon />
              {isOpen &&
                <p className="link-label">
                  {link.label}
                </p>}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default AdminHeader