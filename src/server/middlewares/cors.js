const cors = require('cors')
const { URL } = require('url')

const config = require('../../config')

module.exports = function cors_middleware() {
    return cors({
        credentials: true,
        origin: function(origin, callback) {
            if (config.isDevelopment || config.isTest) {
                // Always allow cors in development or test mode
                return callback(null, true)
            }

            try {
                let hostnameParts = new URL(origin).hostname.split('.')
                if (hostnameParts.length >= 2) {
                    const domain =
                        hostnameParts[hostnameParts.length - 2] +
                        '.' +
                        hostnameParts[hostnameParts.length - 1]

                    // TODO : Enhance to allow registered app's domains as well here!
                    if (domain.toLowerCase() === config.server.domain) {
                        return callback(null, true)
                    }
                }
            } catch (e) {
                // fall-through
            }

            return callback(null, false)
        },
    })
}
