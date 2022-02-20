import React, { ReactNode } from 'react'

export interface ICard {
  children: ReactNode
}

const Card = ({ children }: ICard) => {
  return (
    <div className="card-container">
      {children}
    </div>
  )
}

export default Card