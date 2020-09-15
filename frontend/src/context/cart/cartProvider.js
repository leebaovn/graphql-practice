import React from 'react';
import cartContext from './cart-context';
const INITIAL_STATE = {
  items: [],
  isAuth: false
}

export default function cartProvider({children}) {
  return (
    <cartContext.Provider value={}>
      {children}
    </cartContext.Provider>
  )
}
