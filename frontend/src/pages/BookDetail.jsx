import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/books/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Book not found');
        return res.json();
      })
      .then(setBook)
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!book) return <p>Loading book details...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded font-body text-text">
      <img
        src={book.coverImage}
        alt={`Cover of ${book.title}`}
        className="w-full h-96 object-cover rounded mb-6"
      />
      <h2 className="text-3xl font-heading text-primary mb-2">{book.title}</h2>
      <p className="text-lg text-secondary mb-4">
        By {book.authors?.join(", ") || "Unknown"}
      </p>
      <p className="mb-6">Description: {book.description}</p>
      <div className="mb-4 space-y-2">
        <p className="text-base text-gray-600">
          Genre: {book.genres?.join(", ") || "Unknown"}
        </p>
        <p className="text-base text-gray-600">Publisher: {book.publisher}</p>
        <p className="text-base text-gray-600">
          Publication Date: {
            new Date(book.publicationDate).toLocaleDateString("en-NZ", {
            year: "numeric",
            month: "long",
            day: "numeric",
            })
          }
        </p>
        <p className="text-base text-gray-600">In Stock: {book.stock}</p>
        <p className="text-xl font-semibold">Price: ${book.price.toFixed(2)}</p>
        <p className="text-sm text-gray-500">ISBN: {book.isbn}</p>
      </div>
    </div>
  );
}
