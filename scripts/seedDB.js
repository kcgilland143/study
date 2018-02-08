const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/development",
  {
    useMongoClient: true
  }
);

let wordsSeed = [
  {
    word: "test",
    definition: "something you do to make sure things work",
  },
  {
    word: "rest",
    definition: "something you don't get enough of"
  }
]

wordsSeed = wordsSeed.map(word => {
  word._id = mongoose.Types.ObjectId()
  return word
})

const wordsRef = wordsSeed.map(word => {
  return word._id
})

const wordBankSeed =
  {
    title: "Collection",
    tags: ["this", "is", "a", "test"],
    description: "Testing...",
    words: wordsRef
  }

db.Word
  .remove({})
  .then(() => {
    return db.Word.insertMany(wordsSeed)
  })
  .then(() =>  {
  db.WordBank.create(wordBankSeed)
    .then(data => {
      console.log(data, "records inserted!");
      process.exit(0);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
  })
