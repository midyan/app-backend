const express = require('express')
const passport = require('../passport')

const router = express.Router()

router.post('/guest/login', passport.guest.login)
router.post('/guest/signup', passport.guest.signup)

module.exports = router
