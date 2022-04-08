import { useTranslation } from "react-i18next"

export interface ICustomSelect {
  id: string,
  label: string,
  subLabel?: string,
  selects: any[],
  isRequired?: boolean,
  darkTheme?: boolean,
  hide?: boolean,
  onChange?: (e: any) => {}
}

const CustomSelect = ({
  id,
  label,
  subLabel,
  isRequired,
  darkTheme,
  selects,
  hide = false,
  ...props }: ICustomSelect) => {
  const { t } = useTranslation()
  return (
    <div className={`custom-intput-container ${darkTheme ? 'dark' : ''}`} style={{ margin: '5px 0' }}>
      <h3 className={`${isRequired ? 'required' : ''}`}>
        {label}
      </h3>
      {!hide && <>
        <p>{subLabel}</p>
        <select id={id} {...props}>
          {selects.map((select) => {
            return (
              <option key={select.id} value={select.id}>{t(select.label)}</option>
            )
          })}
        </select></>}
    </div>
  )
}

export default CustomSelect
