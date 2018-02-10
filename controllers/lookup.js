const axios = require('axios');
const db = require('../models')

const oxfordURL = "https://od-api.oxforddictionaries.com/api/v1"
const apiPath = "/entries/en/"
const id = process.env.oxfordID
const key = process.env.oxfordKey

const headers = {
  "app_id": id,
  "app_key": key,
}

function dictionaryLookup(word) {
  return axios({
        method: "get",
        url: oxfordURL + apiPath + word,
        headers: headers,
      })
}

module.exports = function lookup(req, res) {
  const word = req.params.word
  console.log(word)
  dictionaryLookup(word)
  // return db.Word.findOne({word: word})
    .then(response => {
      const data = response.data
      const entry = data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]
      if (entry && entry.length) {
        res.json(entry)
      }
    })
    .catch(err => res.json(err))
}