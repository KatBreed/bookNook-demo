const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: { type: [String], required: true }, 
  description: { type: String, required: true },
  genres: { type: [String], required: true }, 
  format: {type: String, enum: ["Hardcover", "Paperback", "Ebook"], required: true },
  price: { type: Number, required: true },
  isbn: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{13}$/.test(v); 
      },
      message: props => `${props.value} is not a valid 13-digit ISBN`,
    },
  },
  publisher: { type: String, required: true },
  publicationDate: { type: Date, required: true },
  stock: { type: Number, required: true },
  coverImage: { type: String, required: true },
});

module.exports = mongoose.model("Book", bookSchema);
