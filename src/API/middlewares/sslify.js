const sslify = require('express-sslify')

module.exports = function sslify_middleware() {
    return sslify.HTTPS({ trustProtoHeader: true })
}
