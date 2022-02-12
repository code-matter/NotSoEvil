import { Dispatch, SetStateAction, } from 'react'
import { useTranslation } from 'react-i18next'
import { BoolChoice } from '../constants/rdv'
import { ICustomInput } from './CustomInput'

interface ICustomMultiChoice extends ICustomInput {
  choices: BoolChoice[],
  setChoices: Dispatch<SetStateAction<BoolChoice[]>>,
}

const CustomMultiChoice = ({ id, setChoices, label, subLabel, isRequired, choices }: ICustomMultiChoice) => {
  const { t } = useTranslation()
  const handleCheckbox = (choices: BoolChoice[], choice: BoolChoice) => {
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
          <label htmlFor={choice.id}>{t(`form.${choice.label}`)}</label>
        </div>
      ))}
    </div>
  )
}

export default CustomMultiChoice
