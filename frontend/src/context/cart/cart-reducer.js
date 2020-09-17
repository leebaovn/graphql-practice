import { ADD_ITEM, CLEAR_CART } from './cart-action';
export default function reducer(state, action) {
  switch (action.type) {
    case ADD_ITEM: {
      return {
        ...state,
        items: [...state.items, action.payload.items],
      };
    }
    case CLEAR_CART: {
      return {
        ...state,
        items: [],
      };
    }
    default:
      return state;
  }
}
