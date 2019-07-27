const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const { getUserIdentity } = require('../../utils/identity')

const config = require('../../config')

const jwt = require('jsonwebtoken')

module.exports = {
    name: 'guest',
    authFields: {
        usernameField: 'guest_unique_code',
        passwordField: 'guest_authentication_code',
    },
}

module.exports.verify = server =>
    async function verify(guest_unique_code, guest_authentication_code, cb) {
        try {
            const user = await server.models.User.findOne({
                guest_unique_code,
                guest_authentication_code,
            })

            if (!user) throw new Error('Incorrect email or password.')

            return cb(null, user, { message: 'Logged In Successfully' })
        } catch (error) {
            console.log('@@error', error)
            cb(error)
        }
    }

module.exports.setup = function guestSetup(server) {
    const localStrategy = new LocalStrategy(module.exports.authFields, module.exports.verify(server))

    return passport.use(module.exports.name, localStrategy)
}

module.exports.login = function login(req, res, next) {
    return new Promise((resolve, reject) => {
        function doAuthentication(err, user) {
            if (err || !user) {
                return reject({
                    message: 'Invalid guest_unique_code or guest_authentication_code',
                    user: user,
                })
            }

            return req.login(user, { session: false }, async err => {
                if (err) return reject(err)

                const identity = await getUserIdentity(user)

                const token = jwt.sign(identity, config.jwt_secret)

                return resolve({ token })
            })
        }

        return passport.authenticate(module.exports.name, { session: false }, doAuthentication)(
            req,
            res,
            next
        )
    })
}

module.exports.signup = async function signup(req, res, next, server) {
    // TODO Rate limit here, because yeah
    const user = new server.models.User({ user_type: 'guest' })

    user.setDefaultValues()

    await user.save()

    const identity = await getUserIdentity(user)

    const token = jwt.sign(identity, config.jwt_secret)

    return { token }
}
