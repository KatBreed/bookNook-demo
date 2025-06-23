import React from 'react';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const total = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center font-body text-text">
        <h2 className="text-section font-heading mb-6">Your Cart</h2>
        <p className="text-secondary">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl font-body text-text">
      <h2 className="text-section font-heading mb-8 text-center">Your Cart</h2>

      <div className="space-y-4">
        {cartItems.map(item => (
          <div
            key={item._id}
            className="flex items-center justify-between border border-gray-200 bg-white p-4 rounded-lg shadow-sm"
          >
            <div>
              <h3 className="text-lg font-heading text-primary mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-secondary">By {item.author}</p>
              <div className="flex items-center space-x-2 mt-2">
                <button
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
                >
                  -
                </button>
                <span className="font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <p className="text-lg font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeFromCart(item._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <div className="text-right text-xl font-heading text-primary mt-8">
          Total: ${total}
        </div>

        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={clearCart}
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary transition-colors"
          >
            Clear Cart
          </button>
          <button
            onClick={() => alert('Checkout feature coming soon!')}
            className="bg-accent text-white px-4 py-2 rounded hover:bg-primary transition-colors"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}