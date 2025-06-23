const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const Book = require("../models/Book");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");

    // Clear existing books
    await Book.deleteMany();

    // Create fake books
    const books = Array.from({ length: 20 }).map(() => ({
      title: faker.lorem.words(3),
      author: faker.person.fullName(),
      description: faker.lorem.paragraph(),
      price: parseFloat(faker.commerce.price({ min: 5, max: 50 })),
      isbn: faker.string.numeric(13), // Generates a 13-digit number (ISBN-13 style)
      coverImage: `https://picsum.photos/seed/${faker.string.uuid()}/200/300`    }));

    await Book.insertMany(books);
    console.log("Database seeded with fake books!");
    mongoose.connection.close();
  })
  .catch((err) => console.error(err));
