import React from "react";
import { useCart } from "../context/CartContext";

export default function BookCard({ book }) {
  const { addToCart } = useCart();

  return (
    <article className="border rounded p-4 shadow flex flex-col justify-between">
      <div>
        <img src={book.image} alt={book.title} className="w-full h-48 object-cover rounded-t-lg mb-4" />
        <h3 className="font-bold text-lg mb-2">{book.title}</h3>
        <p className="text-gray-700 mb-1">{book.author}</p>
        <p className="mb-4">${book.price.toFixed(2)}</p>
        <button
          onClick={() => addToCart(book)}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}