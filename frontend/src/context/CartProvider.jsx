import React, { createContext, useContext } from 'react';
import { useCartLogic } from './useCartLogic';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const value = useCartLogic();
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}