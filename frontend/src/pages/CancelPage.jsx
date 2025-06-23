export default function CancelPage() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-2xl font-bold mb-4">Payment Cancelled</h1>
      <p className="mb-4">Your payment was cancelled. Feel free to try again when you're ready.</p>
      <a href="/cart" className="text-blue-600 hover:underline">Return to Cart</a>
    </div>
  );
}
