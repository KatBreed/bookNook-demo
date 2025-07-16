import { useCart } from "../context/CartProvider";

export default function CartPage() {
  const {
    cartItems,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/payment/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Checkout error", error);
      alert("Something went wrong");
    }
  };

  if (cartItems.length === 0) {
    return <p className="text-center mt-10">Your cart is empty</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <ul className="divide-y divide-gray-200 mb-6">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center py-4"
          >
            <div className="flex flex-col space-y-1">
              <span className="font-semibold">{item.title}</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="w-7 h-7 border rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="w-7 h-7 border rounded"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 text-red-500 hover:underline text-sm"
                >
                  Remove
                </button>
              </div>
            </div>

            <div className="text-right">
              <p className="font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">
                (${item.price.toFixed(2)} each)
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-between text-lg font-semibold mb-6">
        <span>Total:</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>

      <button
        onClick={handleCheckout}
        className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
