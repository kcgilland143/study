const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wordSchema = new Schema({
  word: {type: String, required: true},
  definitions: {type: Array}
})

const wordsSchema = new Schema({
  title: { type: String, required: true },
  tags: { type: Array },
  description: String,
  words: [{ type: String }],
  date: { type: Date, default: Date.now }
});

const WordBanks = mongoose.model("WordBank", wordsSchema);

module.exports = WordBanks;