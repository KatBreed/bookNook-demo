import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-secondary text-center py-20 px-4">
      <h1 className="font-heading text-hero mb-4 text-text">
        Welcome to the Book Nook Demo
      </h1>
      <p className="font-body text-base text-text mb-4">
        Browse our curated collection of stories and stationery.
      </p>
      <Link
        to="/books"
        className="bg-accent text-white px-6 py-2 rounded font-semibold hover:bg-primary transition"
      >
        Browse Books
      </Link>
    </section>
  );
}
