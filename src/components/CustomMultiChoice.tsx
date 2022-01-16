import React, { Dispatch, SetStateAction, } from 'react'
import { ICustomInput } from './CustomInput'

interface IChoices {
  id: string,
  label: string,
  value: boolean,
}
interface ICustomMultiChoice extends ICustomInput {
  choices: IChoices[],
  setChoices: Dispatch<SetStateAction<any[]>>,
}

const CustomMultiChoice = ({ id, setChoices, label, subLabel, isRequired, choices }: ICustomMultiChoice) => {

  const handleCheckbox = (choices: any, choice: any) => {
    const tmpChoices = [...choices]
    const tmpIdx = tmpChoices.indexOf(choice)
    tmpChoices[tmpIdx].value = !tmpChoices[tmpIdx].value
    setChoices(tmpChoices)
  }
  return (
    <div className='custom-intput-container' style={{ margin: '5px 0' }}>
      <h3 className={`${isRequired ? 'required' : ''}`}>
        {label}
      </h3>
      <p>{subLabel}</p>
      {choices.map((choice, idx) => (
        <div key={choice.id} className='checkbox'>
          <input key={choice.id} type="checkbox" name={choice.id} id={choice.id} checked={choice.value} onChange={() => handleCheckbox(choices, choice)} />
          <label htmlFor={choice.id}>{choice.label}</label>
        </div>
      ))}
    </div>
  )
}

export default CustomMultiChoice
