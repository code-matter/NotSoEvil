interface ICustomCheckBox {
  id: string,
  label: string,
  isRequired?: boolean,
  name?: string,
  checked?: boolean,
}

const CustomCheckBox = ({ id, label, isRequired, name, checked }: ICustomCheckBox) => {
  return (
    <div className='custom-intput-container'>
      <div className={`checkbox authorization ${isRequired ? 'required' : ''}`} >
        <input id={id} type="checkbox" name={name} checked={checked} />
        <label htmlFor={id} className={`${isRequired ? 'required' : ''}`}>
          {label}
        </label>
      </div>
    </div>
  )
}

export default CustomCheckBox
