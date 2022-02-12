interface ICustomTitle {
  label: string,
  isRequired?: boolean,
  color?: string
}

const CustomTitle = ({ label, isRequired, color }: ICustomTitle) => {
  return (
    <div className='custom-intput-container'>
      <h1 className={`title ${isRequired ? 'required' : ''}`} style={{ color }}>
        {label}
      </h1>
    </div>
  )
}

export default CustomTitle
