import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BookCarousel({ genre, title }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/books?genre=${encodeURIComponent(genre)}`)
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(data => {
        setBooks(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load books.");
        setLoading(false);
      });
  }, [genre]);

  const scroll = (direction) => {
    const amount = 300;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
    }
  };

  return (
    <section className="mb-12 relative">
      <h2 className="font-heading text-section mb-4">{title}</h2>

      <div className="relative">
        {/* Left Scroll Button */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full shadow p-1"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Scrollable Book List */}
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-100 pb-2 px-10"
        >
          {books.map((book) => (
            <Link
              key={book._id}
              to={`/books/${book._id}`}
              className="min-w-[200px] bg-white shadow rounded p-3 hover:shadow-md transition"
            >
              <img
                src={book.coverImage || "/default-cover.jpg"}
                alt={book.title}
                className="h-48 w-full object-cover rounded mb-2"
              />
              <h3 className="font-semibold text-base">{book.title}</h3>
              <p className="text-sm text-gray-600 truncate">
                {book.authors.join(", ")}
              </p>
            </Link>
          ))}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full shadow p-1"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Loading & Error States */}
      {loading && <p className="text-gray-500 italic">Loading books...</p>}
      {error && <p className="text-red-600 italic">{error}</p>}
      {!loading && !error && books.length === 0 && (
        <p className="text-gray-500 italic">No books found in this genre.</p>
      )}
    </section>
  );
}
