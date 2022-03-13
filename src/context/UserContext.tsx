import { createContext } from "react";

export const UserContext = createContext<any>({
  language: 'fr',
  user: undefined,
  items: [],
  feedback: undefined,
  cartOpen: false
})