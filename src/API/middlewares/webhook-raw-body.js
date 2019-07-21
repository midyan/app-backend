const bodyParser = require('express')

module.exports = () => (req, res, next) => {
    const isNotApi = /^(?!\/api).*/.test(req.path)

    if (isNotApi) {
        return bodyParser.json({
            verify: (req, res, rawBody) => {
                req.rawBody = rawBody
            },
        })(req, res, next)
    }

    next()
}
