import React, { createContext, useReducer } from 'react';
import cartReducer from './cart-reducer';

const CartContext = createContext();
export default CartContext;
const INITIAL_STATE = {
  items: JSON.parse(window.localStorage.getItem('cart')) || [],
};

export const CartProvider = ({ children }) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, INITIAL_STATE);
  return (
    <CartContext.Provider value={[cartState, cartDispatch]}>
      {children}
    </CartContext.Provider>
  );
};
