const bcrypt = require('bcrypt')

const saltRounds = 8

module.exports = {
  hashPassword(password) {
    return bcrypt.hash(password, saltRounds);
  },
  comparePasswords(plain, hashed) {
    return bcrypt.compare(plain, hashed)
  }
}