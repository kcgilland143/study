const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist",
  {
    useMongoClient: true
  }
);

const wordSeed =
  {
    title: "Collection",
    tags: ["this", "is", "a", "test"],
    description: "Testing...",
    words: [
      {
        word: "test",
        definitions: [
          "something you run",
          "something that runs you"
        ]
      },
      {
        word: "rest",
        definitions: [
          "fancy term for API",
          "something that eludes you"
        ]
      }
    ]
  }

db.Words
  .remove({})
  .then(() =>  {
  db.Words.create(wordSeed)
    .then(data => {
      console.log(data, "records inserted!");
      process.exit(0);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
  })
