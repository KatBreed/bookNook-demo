import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const genresList = [
  "All",
  "Fiction",
  "Non-Fiction",
  "Science Fiction",
  "Fantasy",
  "Biography",
  "Mystery",
  "Romance",
  "Thriller",
  "Historical Fiction",
  "Self-Help",
  "Teen & Young Adult",
  "Children's",
];

const formats = ["All", "Hardcover", "Paperback", "Ebook"];

export default function BooksPage() {
  const query = useQuery();
  const initialGenre = query.get("genre") || "All";

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedGenre, setSelectedGenre] = useState(initialGenre);
  const [selectedFormat, setSelectedFormat] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let url = "http://localhost:5000/api/books";
    const params = new URLSearchParams();

    if (selectedGenre && selectedGenre !== "All") {
      params.append("genre", selectedGenre);
    }
    if (selectedFormat && selectedFormat !== "All") {
      params.append("format", selectedFormat);
    }
    if (searchTerm.trim() !== "") {
      params.append("search", searchTerm);
    }

    if (params.toString()) {
      url += `?${params.toString()}`;
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
  }, [selectedGenre, selectedFormat, searchTerm]);

  return (
    <main className="bg-background text-text font-body min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Browse Books</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="md:col-span-1 bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">Filter</h2>

            {/* Genre Filter */}
            <label className="block text-sm font-medium mb-1">Genre</label>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
            >
              {genresList.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>

            {/* Format Filter */}
            <label className="block text-sm font-medium mb-1">Format</label>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
            >
              {formats.map((format) => (
                <option key={format} value={format}>
                  {format}
                </option>
              ))}
            </select>

            {/* Search */}
            <label className="block text-sm font-medium mb-1">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Title or author"
              className="w-full mb-2 p-2 border border-gray-300 rounded"
            />
          </aside>

          {/* Books Grid */}
          <section className="md:col-span-3">
            {loading ? (
              <p>Loading books...</p>
            ) : books.length === 0 ? (
              <p>No books found.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
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
          </section>
        </div>
      </div>
    </main>
  );
}
