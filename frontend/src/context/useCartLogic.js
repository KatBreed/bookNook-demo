import { useState } from 'react';

export function useCartLogic() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (book) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item._id === book._id);
      return existing
        ? prevItems.map((item) =>
            item._id === book._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prevItems, { ...book, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== id)
    );
  };

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  // ✅ Calculate total price (price * quantity)
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (item.price * item.quantity),
    0
  );

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    totalPrice, // ✅ Return totalPrice to the context
  };
}
