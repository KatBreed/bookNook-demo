import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";  // <-- import Link
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BookCarousel({ genre, title }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/books?genre=${genre}`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched books count:", data.length);
        setBooks(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching books:", err);
        setLoading(false);
      });
  }, [genre]);

  useEffect(() => {
    checkScrollPosition();
  }, [books]);

  const checkScrollPosition = () => {
    const container = carouselRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft + container.clientWidth < container.scrollWidth
    );
  };

  const scroll = (direction) => {
    const container = carouselRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    const newScrollLeft =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({ left: newScrollLeft, behavior: "smooth" });

    setTimeout(checkScrollPosition, 300);
  };

  if (loading) return <p className="text-center">Loading {title}...</p>;
  if (books.length === 0) return <p className="text-center">No books found in {title}.</p>;

  return (
    <section className="my-8 relative">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      {/* Left Chevron */}
      <button
        onClick={() => scroll("left")}
        className={`absolute left-0 top-[45%] z-10 bg-white rounded-full shadow p-1 transition-opacity duration-300 ${
          canScrollLeft ? "opacity-100 cursor-pointer" : "opacity-30 cursor-not-allowed"
        }`}
        aria-label="Scroll left"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Carousel */}
      <div
        ref={carouselRef}
        className="overflow-x-auto whitespace-nowrap scrollbar-hide space-x-4 px-2 flex scroll-smooth"
        onScroll={checkScrollPosition}
      >
        {books.map((book) => (
          <Link
            key={book._id}
            to={`/books/${book._id}`}
            className="inline-block w-48 sm:w-52 md:w-56 lg:w-60 shrink-0 bg-white rounded-lg shadow-md p-2 hover:shadow-lg transition-all duration-300"
          >
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-[300px] object-cover rounded"
            />
            <h3
              className="mt-2 text-lg font-semibold truncate"
              title={book.title}
            >
              {book.title}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-1">{book.authors.join(", ")}</p>
          </Link>
        ))}
      </div>

      {/* Right Chevron */}
      <button
        onClick={() => scroll("right")}
        className={`absolute right-0 top-[45%] z-10 bg-white rounded-full shadow p-1 transition-opacity duration-300 ${
          canScrollRight ? "opacity-100 cursor-pointer" : "opacity-30 cursor-not-allowed"
        }`}
        aria-label="Scroll right"
      >
        <ChevronRight size={24} />
      </button>
    </section>
  );
}
