const express = require('express')
const passport = require('./passport')
const endpointWrapper = require('./endpointWrapper')

module.exports = server => {
    const router = express.Router()

    router.post('/guest/login', endpointWrapper(passport.guest.login, server))
    router.post('/guest/signup', endpointWrapper(passport.guest.signup, server))

    return router
}
