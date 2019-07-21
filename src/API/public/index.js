const express = require('express')

module.exports = server => {
    const router = express.Router()

    router.use('/ping', require('./ping')(server))

    return router
}
