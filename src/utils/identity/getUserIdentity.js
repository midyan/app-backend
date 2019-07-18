const { makeLean } = require('../object')

module.exports = async function getUserIdentity(user) {
    return makeLean(user)
}
