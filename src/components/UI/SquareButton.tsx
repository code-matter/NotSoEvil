import React, { useState } from 'react'
import { RANDOM_COLORS } from '../../pages/HomePage'

export interface ISquareButton {
  label: string,
  disabled?: boolean,
  fontSize?: number,
  type?: "button" | "submit" | "reset" | undefined,
  onClick?: () => void
}

const SquareButton = ({ label, disabled, type, fontSize, onClick }: ISquareButton) => {
  const [isHovered, setIshovered] = useState({ color: '', hovered: false })
  return (
    <button className="square-btn"
      disabled={disabled}
      onClick={onClick}
      type={type || 'button'}
      onMouseEnter={() => setIshovered({ color: RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)], hovered: true })}
      onMouseLeave={() => setIshovered({ color: '', hovered: false })}
      style={{
        fontSize: fontSize || '16px',
        backgroundColor: isHovered.hovered ?
          isHovered.color : '',
        opacity: disabled ? 0.3 : 1,
        pointerEvents: disabled ? 'none' : 'unset',
        outline: isHovered.hovered ?
          `1px solid ${isHovered.color}` : '',
      }}
    >
      {label}
    </button >
  )
}

export default SquareButton