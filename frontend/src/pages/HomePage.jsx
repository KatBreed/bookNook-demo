import React from "react";
import Hero from "../components/Hero";
import BookCarousel from "../components/BookCarousel";

export default function HomePage() {
  return (
    <main className="bg-background text-text font-body min-h-screen">
      <div className="container mx-auto px-4">
        <Hero />

        <section className="mt-12">
          <BookCarousel genre="Fiction" title="Fiction Picks" />
        </section>

        <section className="mt-12">
          <BookCarousel genre="Non-Fiction" title="Explore Non-Fiction" />
        </section>

        <section className="mt-12">
          <BookCarousel genre="Biography" title="Biographies Worth Reading" />
        </section>

        <section className="mt-12">
          <BookCarousel genre="Fantasy" title="Escape into Fantasy" />
        </section>
      </div>
    </main>
  );
}
