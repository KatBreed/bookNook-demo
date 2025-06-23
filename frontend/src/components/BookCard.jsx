import React from "react";
import { useCart } from "../context/CartContext";

export default function BookCard({ book }) {
  const { addToCart } = useCart();

  return (
    <article className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white font-body text-text flex flex-col justify-between hover:shadow-md transition-shadow">
      <div>
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-48 object-cover rounded-t-lg mb-4"
        />
        <h3 className="font-heading text-lg font-semibold text-primary mb-1">
          {book.title}
        </h3>
        <p className="text-sm text-secondary mb-1">{book.author}</p>
        <p className="text-base font-semibold mb-4">${book.price.toFixed(2)}</p>
        <button
          onClick={() => addToCart(book)}
          className="w-full bg-accent text-white py-2 rounded hover:bg-primary transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}