import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useCart } from "../context/CartProvider";

export default function Navbar() {
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const [menuOpen, setMenuOpen] = useState(false);
  const [genreDropdownOpen, setGenreDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const baseLink = "hover:text-accent transition-colors duration-300";
  const activeLink = "text-accent font-semibold";

  const genres = [
  "All Genres",
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
  "Children's"
];

  // ✅ Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setGenreDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      aria-label="Primary navigation"
      className="bg-primary text-white p-4 flex justify-between items-center relative z-30"
    >
      <h1 className="text-xl font-bold">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? activeLink : baseLink)}
          onClick={() => setMenuOpen(false)}
        >
          BookNook Demo
        </NavLink>
      </h1>

      {/* Mobile menu toggle */}
      <button
        className="md:hidden text-white focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Navigation Links */}
      <ul
        className={`flex flex-col md:flex-row md:space-x-6 md:static absolute top-16 right-4 md:top-0 md:right-0 bg-primary md:bg-transparent p-4 md:p-0 rounded-md shadow md:shadow-none ${
          menuOpen ? "block" : "hidden"
        } md:flex`}
      >
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? activeLink : baseLink)}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
        </li>

        {/* Books Dropdown */}
        <li className="relative" ref={dropdownRef}>
          <button
            className={`${baseLink} w-full md:w-auto text-left flex items-center gap-1`}
            onClick={() => setGenreDropdownOpen((prev) => !prev)}
          >
            Books ▾
          </button>

          {/* Dropdown menu */}
          <ul
            className={`${
              genreDropdownOpen ? "block" : "hidden"
            } absolute md:absolute top-full left-0 mt-2 bg-white text-black shadow-lg rounded w-52 z-50`}
          >
            {genres.map((genre) => (
              <li key={genre}>
                <Link
                  to={`/books?genre=${encodeURIComponent(genre)}`}
                  onClick={() => {
                    setGenreDropdownOpen(false);
                    setMenuOpen(false);
                  }}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  {genre}
                </Link>
              </li>
            ))}
          </ul>
        </li>

        <li>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? activeLink : baseLink)}
            onClick={() => setMenuOpen(false)}
          >
            Cart ({cartCount})
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
