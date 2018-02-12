const db = require("../models");

const User = {
  findById: function(data, cb) {
    db.User
      .findById(data.id)
      .then(dbModel => cb(null, dbModel))
      .catch(err => cb(err));
  },
  findByUsername: function(data, cb) {
    db.User
      .findOne({username: data.username})
      .then(dbModel => cb(null, dbModel))
      .catch(err => cb(err))
  },
  create: function(data, cb) {
    db.User
      .create(data)
      .then(dbModel => cb(null, dbModel))
      .catch(err => cb(err));
  }
};

module.exports = User