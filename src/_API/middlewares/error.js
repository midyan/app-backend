module.exports = function error_middleware() {
    return function(err, req, res, next) {
        console.log('Server error', err)

        if (res.headersSent) {
            return next(err)
        }

        let status = 500
        if (err.status && typeof err.status === 'number' && err.status >= 400) {
            status = err.status
        }

        if (req.xhr || req.url.indexOf('/api') === 0) {
            res.status(status).send()
        } else {
            res.status(status)
            res.send('Unexpected Error.')
        }
    }
}
