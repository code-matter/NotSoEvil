import React from 'react'

export interface ICustomInput {
  id: string,
  label: string,
  subLabel?: string,
  isRequired?: boolean,
  hide?: boolean
}

const CustomInput = ({ id, label, subLabel, isRequired, hide = false }: ICustomInput) => {
  return (
    <div className='custom-intput-container' style={{ margin: '5px 0' }}>
      <h3 className={`${isRequired ? 'required' : ''}`}>
        {label}
      </h3>
      {!hide && <>
        <p>{subLabel}</p>
        <input id={id} type="text" /></>}
    </div>
  )
}

export default CustomInput
