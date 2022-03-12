import React, { useEffect, useContext, ReactNode, useReducer } from 'react'
import { useMatch } from 'react-router-dom'
import { USER_KEYS } from '../../constants/reducerKeys'
import { UserContext } from '../../context/UserContext'
import { userInitialstate, userReducer } from '../../reducers/UserReducer'
import { firebaseAuth } from '../../utils/firebase'
import Header from './Header'

export interface ILayout {
  children?: ReactNode
}

const Layout = ({ children }: ILayout) => {
  const userContext = useContext(UserContext)
  const isHome = useMatch('/')
  const [state, dispatch] = useReducer<any>(userReducer, userInitialstate);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        userContext.dispatch({ type: USER_KEYS.SET_USER, payload: user })
      } else {
        userContext.dispatch({ type: USER_KEYS.SET_USER, payload: undefined })

      }
    })
    return () => {
      firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
          userContext.dispatch({ type: USER_KEYS.SET_USER, payload: user })
        } else {
          userContext.dispatch({ type: USER_KEYS.SET_USER, payload: undefined })
        }
      })
    }
  }, [])

  return (
    <div className="App">
      <UserContext.Provider value={{ state, dispatch }}>
        {!isHome && <Header />}
        {children}
      </UserContext.Provider>
    </div>
  )
}

export default Layout