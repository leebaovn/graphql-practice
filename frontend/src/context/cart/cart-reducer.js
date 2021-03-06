import React from 'react';

export const ACTIONS = {
  ADD_ITEM: 'add_item',
  CLEAR_CART: 'clear_cart',
};

export default function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_ITEM: {
      const items = [...state.items, action.payload.items];
      window.localStorage.setItem('cart', JSON.stringify(items));
      return {
        ...state,
        items,
      };
    }
    case ACTIONS.CLEAR_CART: {
      return {
        ...state,
        items: [],
      };
    }
    default:
      return state;
  }
}
