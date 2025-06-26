import React from "react";

export default function GenreFilter({ selectedGenre, onGenreChange }) {
  const genres = [
    "All Genres",
    "Fiction",
    "Non-Fiction",
    "Science Fiction",
    "Fantasy",
    "Biography",
    "Teen & Young Adult",
    "Children's",
    "Mystery", 
    "Romance", 
    "Thriller", 
    "Historical Fiction", 
    "Horror", 
    "Self-Help",
  ];

  return (
    <section className="mb-8">
      <h2 className="font-heading text-2xl text-text mb-6">Filter by Genre</h2>
      <div className="flex flex-wrap gap-3">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => onGenreChange(genre)}
            className={`font-body text-base px-5 py-2 rounded-2xl border transition-colors duration-300
              ${
                selectedGenre === genre
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-text border-gray-300 hover:bg-gray-100"
              } focus:outline-none focus:ring-2 focus:ring-primary`}
          >
            {genre}
          </button>
        ))}
      </div>
    </section>
  );
}
