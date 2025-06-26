import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";

export default function BookGrid({ selectedGenre }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BACKEND_URL = "http://localhost:5000";

  useEffect(() => {
    setLoading(true);
    let url = `${BACKEND_URL}/api/books`;
    if (selectedGenre && selectedGenre !== "All Genres") {
      url += `?genre=${encodeURIComponent(selectedGenre)}`;
    }

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`Network response was not ok: ${res.statusText}`);
        return res.json();
      })
      .then(data => {
        setBooks(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching books:", err);
        setError("Unable to load books at the moment.");
        setLoading(false);
      });
  }, [selectedGenre]);

  if (loading) return <p className="font-body text-text">Loading books...</p>;
  if (error) return <p className="font-body text-red-600">{error}</p>;

  if (books.length === 0) return <p className="font-body text-text">No books found in this genre.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto p-4">
      {books.slice(0, 6).map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
}
