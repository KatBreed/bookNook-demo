const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// GET /api/books?genre=&format=&search=
router.get("/", async (req, res) => {
  try {
    const { genre, format, search } = req.query;

    const filter = {};

    if (genre && genre !== "All") {
      // Since genres is an array, we check if the array contains the genre
      filter.genres = genre;
    }

    if (format && format !== "All") {
      filter.format = format;
    }

    if (search) {
      // Search in title and authors (case-insensitive)
      const searchRegex = new RegExp(search, "i");
      filter.$or = [
        { title: searchRegex },
        { authors: searchRegex }
      ];
    }

    const books = await Book.find(filter);

    res.json(books);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ message: "Server error fetching books" });
  }
});

module.exports = router;
