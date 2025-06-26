const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// GET all books (optionally filter by genre)
router.get("/", async (req, res) => {
  try {
    const { genre } = req.query;
    let books;

    if (genre && genre !== "All Genres") {
      books = await Book.find({ genre: { $regex: new RegExp(`^${genre}$`, 'i') } });
    } else {
      books = await Book.find();
    }

    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET a single book by ID
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
