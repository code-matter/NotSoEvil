import { AnimatePresence } from 'framer-motion'
import { useEffect, useContext, ReactNode, useReducer } from 'react'
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
  const isHome = useMatch('/')
  const isRDV = useMatch('/form')
  const [state, dispatch] = useReducer<any>(userReducer, userInitialstate);
  useEffect(() => {
    console.log(`
    Hey! First, thanks for coming here!
    The artist and myself are quite happy to see you here!
    If you are a web developepr interested in learning more,
    come join us on discord: https://discord.gg/tPuC99czEa

    💻 See you soon! 💻
  `)
  }, [])

  return (
    <div className="App" id="App">
      <UserContext.Provider value={{ state, dispatch }}>
        {!isHome && !isRDV && <Header />}
        {children}
      </UserContext.Provider>
    </div>
  )
}

export default Layout