import React, { ReactNode } from 'react'

export interface ICard {
  children: ReactNode,
  customPagging: number
}

const Card = ({ children, customPagging }: ICard) => {
  return (
    <div className="card-container" style={{ padding: customPagging }}>
      {children}
    </div>
  )
}

export default Card