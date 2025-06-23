import { useCart } from "../context/CartProvider";

export default function CartPage() {
  const { cartItems, totalPrice } = useCart();

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
        window.location.href = data.url; // Redirect to Stripe Checkout
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
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <ul className="divide-y divide-gray-200 mb-6">
        {cartItems.map((item) => (
          <li key={item.id} className="py-3 flex justify-between">
            <span>{item.title}</span>
            <span>${item.price.toFixed(2)}</span>
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
