import { createContext } from "react";
import { CartActionType, CartStateType } from "../reducers/CartReducer";

export type MovieContextType = {
  state: CartStateType;
  dispatch: React.Dispatch<CartActionType>;
};

export type ThemeContextType = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const MovieContext = createContext<MovieContextType | null>(null);
const ThemeContext = createContext<ThemeContextType | null>(null);

export { MovieContext, ThemeContext };
