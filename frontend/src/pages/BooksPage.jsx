import React from 'react';
import BookGrid from '../components/BookGrid';

export default function BooksPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Books</h1>
      <BookGrid />
    </main>
  );
}
