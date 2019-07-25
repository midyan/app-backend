const express = require('express')
const passport = require('./passport')
const endpointWrapper = require('./endpointWrapper')

module.exports = server => {
    const router = express.Router()

    router.post('/guest/login', endpointWrapper(passport.guest.login, server))
    router.post('/guest/signup', endpointWrapper(passport.guest.signup, server))

    router.post('/local/login', endpointWrapper(passport.local.login, server))
    // router.post('/local/signup', endpointWrapper(passport.local.signup, server))

    // router.post('/google/login', endpointWrapper(passport.google.login, server))
    // router.post('/google/signup', endpointWrapper(passport.google.signup, server))

    // router.post('/facebook/login', endpointWrapper(passport.facebook.login, server))
    // router.post('/facebook/signup', endpointWrapper(passport.facebook.signup, server))

    // router.post('/amazon/login', endpointWrapper(passport.amazon.login, server))
    // router.post('/amazon/signup', endpointWrapper(passport.amazon.signup, server))

    return router
}
