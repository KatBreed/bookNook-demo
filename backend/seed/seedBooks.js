const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const Book = require("../models/Book");
require("dotenv").config();

const genresList = [
  "Fiction", "Fantasy", "Science Fiction", "Mystery", "Romance", "Thriller",
  "Non-Fiction", "Historical Fiction", "Horror", "Biography", "Self-Help",
];

async function seedBooks() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await Book.deleteMany();

    const allBooks = [];

    for (const genre of genresList) {
      for (let i = 0; i < 10; i++) {
        const authorsCount = faker.number.int({ min: 1, max: 2 });
        const id = faker.number.int({ min: 1, max: 1000 }); 

        const book = new Book({
          title: faker.lorem.words(3),
          authors: Array.from({ length: authorsCount }, () => faker.person.fullName()),
          description: faker.lorem.paragraph(),
          genres: [genre],
          price: parseFloat(faker.commerce.price({ min: 5, max: 50 })),
          isbn: faker.string.numeric({ length: 13 }),
          publisher: faker.company.name(),
          publicationDate: faker.date.past({ years: 10 }),
          stock: faker.number.int({ min: 0, max: 100 }),
          coverImage: `https://picsum.photos/id/${id}/200/300`, 
        });

        allBooks.push(book);
      }
    }

    await Book.insertMany(allBooks);
    console.log("Seeded books by genre!");
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

seedBooks();
