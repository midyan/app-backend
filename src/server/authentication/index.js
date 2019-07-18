const express = require('express')
const passport = require('../passport')
const endpointWrapper = require('../endpointWrapper')
const router = express.Router()

router.post('/guest/login', endpointWrapper(passport.guest.login))
router.post('/guest/signup', endpointWrapper(passport.guest.signup))

module.exports = router
