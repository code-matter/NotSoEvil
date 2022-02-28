export interface ICustomInput {
  id: string,
  label: string,
  subLabel?: string,
  isRequired?: boolean,
  darkTheme?: boolean,
  hide?: boolean
}

const CustomInput = ({ id, label, subLabel, isRequired, darkTheme, hide = false, ...props }: ICustomInput) => {
  return (
    <div className={`custom-intput-container ${darkTheme ? 'dark' : ''}`} style={{ margin: '5px 0' }}>
      <h3 className={`${isRequired ? 'required' : ''} `} >
        {label}
      </h3>
      {!hide && <>
        <p>{subLabel}</p>
        <input id={id} type="text" {...props} /></>}
    </div>
  )
}

export default CustomInput
