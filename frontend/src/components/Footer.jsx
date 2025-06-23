import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-6 text-center mt-12 font-body">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Bookshop Demo. All rights reserved.
      </p>
      <div className="mt-3 flex justify-center space-x-6 text-sm">
        <Link to="/" className="hover:text-accent transition-colors">
          Home
        </Link>
        <Link to="/books" className="hover:text-accent transition-colors">
          Books
        </Link>
        <Link to="/cart" className="hover:text-accent transition-colors">
          Cart
        </Link>
      </div>
    </footer>
  );
}
