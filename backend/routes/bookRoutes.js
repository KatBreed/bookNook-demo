const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// GET all books with optional genre filter
router.get("/", async (req, res) => {
  try {
    let genre = req.query.genre ? req.query.genre.trim() : null;

    const query = genre && genre !== "All Genres"
      ? { genres: { $in: [new RegExp(`^${genre}$`, "i")] } }
      : {};

    const books = await Book.find(query)
    .sort({publicationDate: -1})
    .limit(10);
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
