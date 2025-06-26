const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const Book = require("../models/Book");
require("dotenv").config();

const genresList = [
  "Fiction", "Fantasy", "Science Fiction", "Mystery", "Romance", "Thriller",
  "Non-Fiction", "Historical Fiction", "Horror", "Biography", "Self-Help",
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");

    // Clear existing books
    await Book.deleteMany();

    const books = Array.from({ length: 20 }).map(() => {
      const authorsCount = faker.number.int({ min: 1, max: 15 });
      const genresCount = faker.number.int({ min: 1, max: 15 });

      return {
        title: faker.lorem.words(3),
        authors: Array.from({ length: authorsCount }, () => faker.person.fullName()),
        description: faker.lorem.paragraph(),
        genres: faker.helpers.arrayElements(genresList, genresCount),
        price: parseFloat(faker.commerce.price({ min: 5, max: 50 })),
        isbn: faker.string.numeric({ length: 13 }),
        publisher: faker.company.name(),
        publicationDate: faker.date.past({ years: 10 }),
        stock: faker.number.int({ min: 0, max: 100 }),
        coverImage: `https://picsum.photos/seed/${faker.string.uuid()}/200/300`,
      };
    });

    await Book.insertMany(books);
    console.log("Database seeded with fake books!");
    mongoose.connection.close();
  })
  .catch((err) => console.error(err));
