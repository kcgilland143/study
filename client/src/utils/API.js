import axios from "axios";

export default {
  // Gets all books
  getWords: function() {
    return axios.get("/api/words");
  },
  // Gets the book with the given id
  getWord: function(id) {
    return axios.get("/api/words/" + id);
  },
  // Deletes the book with the given id
  deleteWord: function(id) {
    return axios.delete("/api/words/" + id);
  },
  // Saves a book to the database
  saveWord: function(data) {
    return axios.post("/api/words", data);
  },

  getWordBanks: function() {
    return axios.get("/api/wordbanks");
  },
  // Gets the book with the given id
  getWordBank: function(id) {
    return axios.get("/api/wordbanks/" + id);
  },
  // Deletes the book with the given id
  deleteWordBank: function(id) {
    return axios.delete("/api/wordbanks/" + id);
  },
  // Saves a book to the database
  saveWordBank: function(data) {
    return axios.post("/api/wordbanks", data);
  },
  dictionaryLookup: function(word) {
    return axios.get("/api/words/search/" + encodeURIComponent(word))
  }
};
