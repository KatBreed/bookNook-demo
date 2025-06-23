import React from "react";
import Hero from "../components/Hero";
import BookGrid from "../components/BookGrid";

export default function HomePage() {
  return (
    <main>
      <div className="container mx-auto px-4">
        <Hero />
        <BookGrid />
      </div>
    </main>
  );
}
