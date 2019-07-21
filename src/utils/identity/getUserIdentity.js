const { makeLean } = require('../object')

const sensitiveFields = [
    'password',
    'guest_authentication_code',
]

module.exports = async function getUserIdentity(user) {
    const leanUser = makeLean(user)

    for (let field in leanUser) {
        if (sensitiveFields.includes(field)) {
            delete leanUser[field]
        }
    }

    return leanUser
}
