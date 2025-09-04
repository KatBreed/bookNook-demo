import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedGenre, setSelectedGenre] = useState("All");

  // keep Navbar dropdown in sync with URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const genre = params.get("genre") || "All";
    setSelectedGenre(genre);
  }, [location.search]);

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="flex space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/books" className="hover:underline">Books</Link>
      </div>

      {/* Navbar dropdown */}
      <select
        value={selectedGenre}
        onChange={(e) => {
          const value = e.target.value;
          setSelectedGenre(value);
          navigate(value === "All" ? "/books" : `/books?genre=${encodeURIComponent(value)}`);
        }}
        className="p-2 text-black rounded"
      >
        {["All", "Fantasy", "Sci-Fi", "Romance", "Thriller"].map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </nav>
  );
};

export default Navbar;
