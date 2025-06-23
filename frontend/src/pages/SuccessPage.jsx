// src/pages/SuccessPage.jsx
import { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";

export default function SuccessPage() {
  const stripe = useStripe();
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (stripe && clientSecret) {
      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        switch (paymentIntent.status) {
          case "succeeded":
            setStatus("Payment succeeded! 🎉 Thank you for your purchase.");
            break;
          case "processing":
            setStatus("Payment processing. We'll update you soon.");
            break;
          case "requires_payment_method":
            setStatus("Payment failed. Please try another payment method.");
            break;
          default:
            setStatus("Something went wrong.");
            break;
        }
      });
    }
  }, [stripe]);

  return (
    <div className="text-center mt-20">
      <h1 className="text-2xl font-bold mb-4">{status}</h1>
      <a href="/" className="text-blue-600 hover:underline">Return to Home</a>
    </div>
  );
}
