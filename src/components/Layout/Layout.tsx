import React, { useEffect, useContext, ReactNode } from 'react'
import { USER_KEYS } from '../../constants/reducerKeys'
import { UserContext } from '../../context/UserContext'
import { firebaseAuth } from '../../utils/firebase'
import Header from './Header'

export interface ILayout {
  children?: ReactNode
}

const Layout = ({ children }: ILayout) => {
  const userContext = useContext(UserContext)

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        userContext.dispatch({ type: USER_KEYS.SET_USER, payload: user })
        console.log('logged in');
      } else {
        console.log('logged out');
        userContext.dispatch({ type: USER_KEYS.SET_USER, payload: undefined })

      }
    })
    return () => {
      firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
          userContext.dispatch({ type: USER_KEYS.SET_USER, payload: user })
          console.log('logged in');
        } else {
          console.log('logged out');
          userContext.dispatch({ type: USER_KEYS.SET_USER, payload: undefined })
        }
      })
    }
  }, [])

  return (
    <div className="App">
      <Header />
      {children}
    </div>
  )
}

export default Layout