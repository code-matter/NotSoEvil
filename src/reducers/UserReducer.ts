import { USER_KEYS } from "../constants/reducerKeys";

interface IInitialState {
  language: string | undefined;
  user: any | undefined;
  items: any[];
  feedback: string | undefined;
}

export const userInitialstate: IInitialState = {
  language:
    localStorage.getItem("i18nextLng") || navigator.language.slice(0, 2),
  user: undefined,
  items: [],
  feedback: undefined,
};

export const userReducer = (state: IInitialState, action: any) => {
  switch (action.type) {
    case USER_KEYS.SET_USER:
      // localStorage.setItem('@user',)
      return { ...state, user: action.payload };
    case USER_KEYS.SET_LANGUAGE:
      return { ...state, language: action.payload };
    case USER_KEYS.ADD_ITEMS:
      return { ...state, items: [...state.items, action.payload] };
    case USER_KEYS.SET_FEEDBACK:
      return { ...state, feedback: action.payload };
    default:
      return state;
  }
};
