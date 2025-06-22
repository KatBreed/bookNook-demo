import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const [menuOpen, setMenuOpen] = useState(false);

  const baseLink = 'hover:text-gray-300 transition-colors duration-300';
  const activeLink = 'text-indigo-400 font-semibold';

  return (
    <nav
      aria-label="Primary navigation"
      className="bg-gray-800 text-white p-4 flex justify-between items-center"
    >
      {/* Logo */}
      <h1 className="text-xl font-bold">
        <NavLink
          to="/"
          className={({ isActive }) => isActive ? activeLink : baseLink}
          onClick={() => setMenuOpen(false)}
        >
          Bookshop Demo
        </NavLink>
      </h1>

      {/* Hamburger Button */}
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
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Nav Links */}
      <ul className={`flex flex-col md:flex-row md:space-x-6 md:static absolute top-16 right-4 bg-gray-800 md:bg-transparent p-4 md:p-0 rounded-md ${menuOpen ? 'block' : 'hidden'} md:flex`}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? activeLink : baseLink}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/books"
            className={({ isActive }) => isActive ? activeLink : baseLink}
            onClick={() => setMenuOpen(false)}
          >
            Books
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cart"
            className={({ isActive }) => isActive ? activeLink : baseLink}
            onClick={() => setMenuOpen(false)}
          >
            Cart ({cartCount})
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
