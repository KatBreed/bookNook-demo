import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const location = useLocation();
  const navigate = useNavigate();

  // sync with URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const genre = params.get("genre") || "All";
    setSelectedGenre(genre);
  }, [location.search]);

  // fetch books on genre change
  useEffect(() => {
    const fetchBooks = async () => {
      let url = "/api/books";
      if (selectedGenre !== "All") {
        url += `?genre=${encodeURIComponent(selectedGenre)}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      setBooks(data);
    };

    fetchBooks();
  }, [selectedGenre]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-1/4 p-4 border-r">
        <h2 className="text-lg font-semibold mb-2">Filter by Genre</h2>
        <select
          value={selectedGenre}
          onChange={(e) => {
            const value = e.target.value;
            setSelectedGenre(value);
            navigate(value === "All" ? "/books" : `/books?genre=${encodeURIComponent(value)}`);
          }}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        >
          {["All", "Fantasy", "Sci-Fi", "Romance", "Thriller"].map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Books</h1>
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              {book.title} — {book.genre}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default BooksPage;
