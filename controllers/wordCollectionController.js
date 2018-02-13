const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    db.WordBank
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.WordBank
      .findById(req.params.id)
      .then(dbModel => {
        const bank = dbModel
        let words = bank.words.map((word) => db.Word.findOne({_id: word}))
        return Promise.all([...words, bank])
        // console.log(dbModel)
        // res.json(dbModel)
      })
      .then(bank => {
        var wordBank = Object.assign({}, bank.pop()._doc)
        
        // var wordBank = bank.shift()
        
        let words = bank.map(word => ({
          _id: word._id,
          word: word.word,
          definition: word.definition
        }))
        
        wordBank.words = words
        
        res.json(wordBank)
        
        // res.json(bank)
      })
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.WordBank
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.WordBank
      .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.WordBank
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
