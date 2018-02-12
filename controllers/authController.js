const Users = require("../Auth/Users");
const jwt = require("jsonwebtoken")

const secret = "Ultra secure"
// Defining methods for the booksController
module.exports = {
  login: function (req, res) {
    const {username, password} = req.body
    if (usernameAndPassword(username, password)) {
      Users.findByUsername({username, password}, (err, data) => {
        if (err) return res.json(err)
        if (data.password === password) {
          jwt.sign(data.toObject(), secret, {expiresIn: 60 * 60}, 
            (err, token) => res.json({err, token}))
        } else res.json({
          err:"Invalid username or password",
          token:""
        })
      })
        //find user
        //check password against stored
        //return jwt with paload of userObj
    } else res.send('username and password must be string with length > 1')
  },
  signup: function (req, res) {
    const {username, password} = req.body
    if (usernameAndPassword(username, password)) {
      Users.create(req.body, (err, data) => {
        if (err) return res.json(err)
        return res.send(`Created user ${data._id}`)
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