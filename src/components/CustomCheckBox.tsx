import React from 'react'

interface ICustomCheckBox {
  id: string,
  label: string,
  isRequired?: boolean
}

const CustomCheckBox = ({ id, label, isRequired }: ICustomCheckBox) => {
  return (
    <div className='custom-intput-container'>
      <div className={`checkbox authorization ${isRequired ? 'required' : ''}`} >
        <input id={id} type="checkbox" />
        <label className={`${isRequired ? 'required' : ''}`}>
          {label}
        </label>
      </div>
    </div>
  )
}

export default CustomCheckBox
