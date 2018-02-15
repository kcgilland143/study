const Users = require("../Auth/Users");
const Hash = require("../Auth/hashing")
const jwt = require("jsonwebtoken")

const secret = process.env.jwtSecret || "Ultra secure"
// Defining methods for the booksController
module.exports = {
  login: function (req, res) {
    let {username, password} = req.body
    if (usernameAndPassword(username, password)) {
      Users.findByUsername({username}, (err, data) => {
        if (err) return res.status(401).send("invalid username or password")
        Hash.comparePasswords(password, data.password)
          .then((same) => {
            console.log('same',same)
            if (same) {
              let {_id, username} = data.toObject()
              jwt.sign({_id, username}, secret, 
                { expiresIn: 60 * 60 }, 
                (err, token) => res.json({err, token}))
            } else res.status(401).send("invalid username or password")
          })
      })
        //find user
        //check password against stored
        //return jwt with paload of userObj
    } else res.status(401).send('username and password must be string with length > 1')
  },
  signup: function (req, res) {
    let {username, password} = req.body
    if (usernameAndPassword(username, password)) {
      Users.findByUsername({username}, (err, data) => {
        if (!err && !data) {
          Hash.hashPassword(password)
            .then((hashed) => {
              password = hashed
              Users.create({username, password}, (err, data) => {
                if (err) return res.json(err)
                return res.send(`Created user ${data._id}`)
              })
            })
        } else res.json("user already exists")
      })
    } else res.json("idk bro")
    //create user
  },
  verify: function (req, res) {
    jwt.verify(req.body.token, secret, (err, token) => res.json({err, token}))
    //get jwt, 
  }
};

function usernameAndPassword(username, password) {
  if (username && typeof username === 'string' && username.length) {
    if (password && typeof password === 'string' && password.length) {
      return true
    } else return false
  } else return false
}