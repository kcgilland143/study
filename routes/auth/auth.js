const router = require('express').Router()
const authController = require("../../controllers/authController")

router.route('/login')
  .post(authController.login)
//takes user, pass, returns token

router.route('/signup')
  .post(authController.signup)
//takes user, pass, saves to database

router.route('/verify')
  .post(authController.verify)
//takes token, validates and returns??

module.exports = router