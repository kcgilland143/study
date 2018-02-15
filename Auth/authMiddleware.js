const jwt = require('jsonwebtoken')
const Users = require('./Users.js')

const secret = process.env.jwtSecret || "Ultra Secure"

const authMiddleware = function (req, res, next) {
  const authorization = req.headers.authorization
  if (!authorization) { res.status(401).send('not authorized')}

  jwt.verify(authorization, secret, 
  (err, token) =>   {
    console.log(err, token)
    
    if (err) return res.status(401).send('not authorized');

    Users.findById(token, (err, user) => {
      console.log(err, user)
      if (err) return res.status(401).send('not authorized');
      req.user = user
      return next()
    })
  })
}

module.exports = authMiddleware