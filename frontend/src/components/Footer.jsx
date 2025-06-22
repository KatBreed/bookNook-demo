import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 text-center mt-8">
      <p className="text-sm">&copy; {new Date().getFullYear()} Bookshop Demo. All rights reserved.</p>
      <div className="mt-2 flex justify-center space-x-4">
        <Link to="/" className="hover:text-gray-300 text-sm">Home</Link>
        <Link to="/books" className="hover:text-gray-300 text-sm">Books</Link>
        <Link to="/cart" className="hover:text-gray-300 text-sm">Cart</Link>
      </div>
    </footer>
  );
}
