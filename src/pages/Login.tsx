import React, { FormEvent, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import CustomInput from '../components/CustomInput'
import Button from '../components/UI/Button'
import SquareButton from '../components/UI/SquareButton'
import { USER_KEYS } from '../constants/reducerKeys'
import { UserContext } from '../context/UserContext'
import { UsersService } from '../services/users.services'
export interface ILogin {

}

const Login = ({ }: ILogin) => {
  const [form, setForm] = useState<any>({})
  const { t } = useTranslation()
  const navigate = useNavigate()
  const userContext = useContext(UserContext);
  const handleFormChange = (event: FormEvent) => {
    setForm(
      {
        ...form,
        [(event.target as HTMLInputElement).id]:
          (event.target as HTMLInputElement).value === 'on'
            ?
            (event.target as HTMLInputElement).checked :
            (event.target as HTMLInputElement).value
      })
  }

  const sendForm = async (e: FormEvent) => {
    e.preventDefault();
    const tmpForm: any = { ...form };
    Object.keys(form).forEach((info: string) => {
      if (form[info]) {
        tmpForm[info] = form[info]
      }
    })
    const user = await UsersService.login(form.username, form.password);
    userContext.dispatch({ type: USER_KEYS.SET_USER, payload: user?.user })
    navigate('/admin/home')
  }

  return (
    <div className="login-container container">
      <form onSubmit={sendForm} onChange={handleFormChange}>
        <CustomInput id="username" label={t('general.username')} />
        <CustomInput id="password" label={t('general.password')} />
        <SquareButton
          label={t('general.login')}
          type="submit" />
      </form>
    </div>
  )
}

export default Login