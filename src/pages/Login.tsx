import React, { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomInput from '../components/CustomInput'
import { UsersService } from '../services/users.services'
export interface ILogin {

}

const Login = ({ }: ILogin) => {
  const [form, setForm] = useState<any>({})
  const navigate = useNavigate()

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

  const sendForm = (e: FormEvent) => {
    e.preventDefault();
    const tmpForm: any = { ...form };
    Object.keys(form).forEach((info: string) => {
      if (form[info]) {
        tmpForm[info] = form[info]
      }
    })
    UsersService.login(form.username, form.password);
    navigate('/admin/home')
  }
  return (
    <div>
      <form onSubmit={sendForm} onChange={handleFormChange}>
        <CustomInput id="username" label="username" />
        <CustomInput id="password" label="password" />
        <button
          type="submit"> SEND
        </button>
        <button
          type="button"
          onClick={() => UsersService.logout()}>LOG OUT
        </button>
      </form>
    </div>
  )
}

export default Login