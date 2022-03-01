import React, { ReactNode } from 'react'

export interface ICard {
  children: ReactNode,
  customPadding?: number
}

const Card = ({ children, customPadding }: ICard) => {
  return (
    <div className="card-container" style={{ padding: customPadding }}>
      {children}
    </div>
  )
}

export default Card