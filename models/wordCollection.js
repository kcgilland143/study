const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wordsSchema = new Schema({
  title: { type: String, required: true },
  tags: { type: Array },
  description: String,
  words: [{ type: String }],
  date: { type: Date, default: Date.now }
});

const WordBank = mongoose.model("WordBank", wordsSchema);

module.exports = WordBank;