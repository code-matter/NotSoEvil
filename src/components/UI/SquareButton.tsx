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
  const [ishovered, setIshovered] = useState(false)
  return (
    <button className="square-btn"
      disabled={disabled}
      onClick={onClick}
      type={type || 'button'}
      onMouseEnter={() => setIshovered(true)}
      onMouseLeave={() => setIshovered(false)}
      style={{
        fontSize: fontSize || '16px',
        backgroundColor: ishovered ?
          RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)] : '',
        opacity: disabled ? 0.3 : 1,
        pointerEvents: disabled ? 'none' : 'unset'
      }}
    >
      {label}
    </button >
  )
}

export default SquareButton