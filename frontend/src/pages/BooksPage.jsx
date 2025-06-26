import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function BooksPage() {
  const query = useQuery();
  const genre = query.get("genre");

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let url = "http://localhost:5000/api/books";
    if (genre) {
      url += `?genre=${encodeURIComponent(genre)}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch books:", err);
        setLoading(false);
      });
  }, [genre]);

  return (
    <main className="bg-background text-text font-body min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">
          {genre ? `Books in ${genre}` : "All Books"}
        </h1>

        {loading ? (
          <p>Loading books...</p>
        ) : books.length === 0 ? (
          <p>No books found{genre ? ` in ${genre}` : ""}.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {books.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded shadow-md p-3 hover:shadow-lg transition-all"
              >
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-60 object-cover rounded"
                />
                <h3 className="mt-2 text-lg font-semibold truncate" title={book.title}>
                  {book.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-1">
                  {book.authors.join(", ")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
