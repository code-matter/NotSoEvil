
export interface IButton {
  label: string,
  disabled?: boolean,
  type?: "button" | "submit" | "reset" | undefined,
  onClick?: () => void
}

const Button = ({ label, disabled, type, onClick }: IButton) => {
  return (
    <button className="custom-btn" disabled={disabled} onClick={onClick} type={type || 'button'}>
      {label}
    </button>
  )
}

export default Button