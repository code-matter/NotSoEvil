
export interface ICustomTextArea {
  id: string,
  label: string,
  subLabel?: string,
  darkTheme?: boolean,
  isRequired?: boolean
}

const CustomTextArea = ({ id, label, subLabel, isRequired, darkTheme }: ICustomTextArea) => {
  return (
    <div className={`custom-intput-container ${darkTheme ? 'dark' : ''}`} style={{ margin: '5px 0' }}>
      <h3 className={`${isRequired ? 'required' : ''}`}>
        {label}
      </h3>
      <p>{subLabel}</p>
      <textarea id={id} />
    </div>
  )
}

export default CustomTextArea
