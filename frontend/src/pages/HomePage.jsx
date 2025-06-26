import React from "react";
import Hero from "../components/Hero";
import BookCarousel from "../components/BookCarousel";

export default function HomePage() {
  return (
    <main className="bg-background text-text font-body min-h-screen">
      <div className="container mx-auto px-4">
          <Hero />
          <section className="mt-12 space-y-12">
            <BookCarousel genre="Fiction" title="Fiction Picks" />
            <BookCarousel genre="Romance" title="Romantic Reads" />
            <BookCarousel genre="Thriller" title="Edge of Your Seat" />
            <BookCarousel genre="Fantasy" title="Fantasy Realms" />
          </section>
        </div>
    </main>
  );
}
