module.exports = function start(mongoose) {
    module.exports.mongoose = mongoose

    module.exports.UserModel = require('./User')

    return mongoose
}
