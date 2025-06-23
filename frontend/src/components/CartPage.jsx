import { Link } from "react-router-dom";
import { useCart } from "../context/CartProvider";

export default function CartPage() {
  const { cartItems, totalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link to="/books" className="text-blue-600 hover:underline">
          Browse Books
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <ul className="divide-y divide-gray-200 mb-6">
        {cartItems.map((item) => (
          <li key={item.id} className="py-4">
            <div className="flex justify-between">
              <span>{item.title}</span>
              <span>${item.price}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center mb-6">
        <span className="font-bold">Total:</span>
        <span className="text-xl font-bold">${totalPrice}</span>
      </div>

      <Link to="/checkout">
        <button className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Proceed to Checkout
        </button>
      </Link>
    </div>
  );
}
