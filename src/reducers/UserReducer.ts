import { USER_KEYS } from "../constants/reducerKeys";

interface IInitialState {
  language: string | undefined;
  user: any | undefined;
  items: any[];
  feedback: string | undefined;
  cartOpen: boolean;
}

export const userInitialstate: IInitialState = {
  language:
    localStorage.getItem("i18nextLng") || navigator.language.slice(0, 2),
  user: undefined,
  items: [],
  feedback: undefined,
  cartOpen: false,
};

export const userReducer = (state: IInitialState, action: any) => {
  switch (action.type) {
    case USER_KEYS.SET_USER:
      // localStorage.setItem('@user',)
      return { ...state, user: action.payload };
    case USER_KEYS.SET_LANGUAGE:
      return { ...state, language: action.payload };
    case USER_KEYS.ADD_ITEMS:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case USER_KEYS.REMOVE_ITEMS:
      const tmpItems = [...state.items];
      const tmpIdx = state.items.indexOf(
        tmpItems.find((item) => item.id === action.payload)
      );
      tmpItems.splice(tmpIdx, 1);
      return {
        ...state,
        items: tmpItems,
        cartOpen: tmpItems.length > 0 ? true : false,
      };
    case USER_KEYS.SET_FEEDBACK:
      return { ...state, feedback: action.payload };
    case USER_KEYS.TOGGLE_CART:
      return { ...state, cartOpen: !state.cartOpen };
    case USER_KEYS.RESET_CART:
      return { ...state, items: [], cartOpen: false };
    default:
      return state;
  }
};
