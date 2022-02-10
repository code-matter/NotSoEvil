import React, { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next';
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface ICustomAvailabilities {
  id: string,
  color: string,
  arrowColor?: string,
  openedAvailabilities: string[],
  setOpenedAvailabilities: Dispatch<SetStateAction<string[]>>,
  setDay: Dispatch<SetStateAction<string[]>>,
  label: string,
  subLabel?: string,
  choices: any[],
  isRequired?: boolean
}


const CustomAvailabilities = ({ id, color, arrowColor, openedAvailabilities, setOpenedAvailabilities, setDay, label, subLabel, isRequired, choices }: ICustomAvailabilities) => {
  const toggleAvailabilities = (id: string) => {
    if (openedAvailabilities.includes(id)) {
      const tmpAvailabilities = [...openedAvailabilities];
      const tmpIdx = openedAvailabilities.indexOf(id);
      tmpAvailabilities.splice(tmpIdx, 1)
      setOpenedAvailabilities(tmpAvailabilities)
    } else {
      setOpenedAvailabilities([...openedAvailabilities, id])
    }
  }

  const handleCheckbox = (choices: any, choice: any) => {
    const tmpChoices = [...choices]
    const tmpIdx = tmpChoices.indexOf(choice)
    tmpChoices[tmpIdx].value = !tmpChoices[tmpIdx].value
    setDay(tmpChoices)
  }

  const { t } = useTranslation()

  return (
    <>
      <div className='custom-intput-container availabilities-container' style={{ backgroundColor: color, marginBottom: id === 'fri' ? '20px' : 0 }}>
        <h3 className={`${isRequired ? 'required' : ''}`} onClick={() => toggleAvailabilities(id)}>
          <span className='hoverable'>
            {label}
          </span>
          <span >
            {openedAvailabilities.includes(id) ? <FiChevronUp size={35} color={arrowColor} /> : <FiChevronDown size={35} color={arrowColor} />}
          </span>
        </h3>
        <p>{subLabel}</p>
        {openedAvailabilities.includes(id) && choices.map((choice, idx) => (
          <div key={idx} className='checkbox'>
            <input key={choice.id}
              type="checkbox"
              name={choice.id}
              id={choice.id}
              checked={choice.value}
              onChange={() => handleCheckbox(choices, choice)} />
            <label htmlFor={choice.id}>{t(`form.${choice.label}`)}</label>
          </div>
        ))}
      </div>
    </>
  )
}

export default CustomAvailabilities
