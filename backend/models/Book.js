const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  }, 
  price: {
    type: Number,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  publicationDate: {
    type: Date,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Book", bookSchema);
