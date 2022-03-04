import { USER_KEYS } from "../constants/reducerKeys";

interface IInitialState {
  language: string | undefined;
  user: any | undefined;
}

export const userInitialstate: IInitialState = {
  language:
    localStorage.getItem("i18nextLng") || navigator.language.slice(0, 2),
  user: undefined,
};

export const userReducer = (state: IInitialState, action: any) => {
  switch (action.type) {
    case USER_KEYS.SET_USER:
      console.log("action.payload: ", action.payload);
      // localStorage.setItem('@user',)
      return { ...userInitialstate, user: action.payload };
    case USER_KEYS.SET_LANGUAGE:
      return { ...userInitialstate, language: action.payload };
    default:
      return state;
  }
};
