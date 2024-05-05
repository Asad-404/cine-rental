import { IMovieDetails } from "../components/movieList/MovieCard";

export type CartStateType = { cartData: IMovieDetails[] };

export type CartActionType = {
  type: string;
  payload: IMovieDetails;
};

const initialState = {
  cartData: [],
};

const cartReducer = (state: CartStateType, action: CartActionType) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        cartData: [...state.cartData, action.payload],
      };
      break;
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartData: state.cartData.filter((el) => el.id !== action.payload.id),
      };
      break;
    default:
      return state;
      break;
  }
};

export { cartReducer, initialState };
