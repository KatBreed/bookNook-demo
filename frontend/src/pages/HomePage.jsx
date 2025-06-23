import React from "react";
import Hero from "../components/Hero";
import BookGrid from "../components/BookGrid";

export default function HomePage() {
  return (
    <main className="bg-background text-text font-body min-h-screen">
      <div className="container mx-auto px-4">
          <Hero />
          <section className="mt-12">
            <h2 className="font-heading text-section mb-6 text-center">
              Featured Books
            </h2>
            <BookGrid />
          </section>
        </div>
    </main>
  );
}
