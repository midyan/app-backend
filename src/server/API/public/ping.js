const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    const { code = 200, ...response } = req.query

    return res.status(code).send(response)
})

router.post('/', (req, res) => {
    const { code = 200, ...response } = req.body

    return res.status(code).send(response)
})

module.exports = router
