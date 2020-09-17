import { createContext } from 'react';
import reducer from './cart-reducer';

export const cartContext = createContext();
const INITIAL_STATE = {
  items: [],
};

export function cartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <cartContext.Provider value={[state, dispatch]}>
      {children}
    </cartContext.Provider>
  );
}
