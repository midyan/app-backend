const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const { getUserIdentity } = require('../../utils/identity')

const config = require('../../config')

const jwt = require('jsonwebtoken')

module.exports = {
    authFields: {
        usernameField: 'email',
        passwordField: 'password',
    },
}

module.exports.verifyCrendentials = server =>
    async function verifyCrendentials(email, rawPassword, cb) {
        try {
            // encrypt password
            const password = server.models.User.encyptPassword(rawPassword)

            const user = await server.models.User.findOne({
                email,
                password,
            })

            if (!user) throw new Error('Incorrect email or password.')

            return cb(null, user, { message: 'Logged In Successfully' })
        } catch (error) {
            console.log('@@error', error)
            cb(error)
        }
    }

module.exports.setup = function localSetup(server) {
    const localStrategy = new LocalStrategy(
        module.exports.authFields,
        module.exports.verifyCrendentials(server)
    )

    return passport.use(localStrategy)
}

module.exports.login = function login(req, res) {
    return new Promise((resolve, reject) => {
        function doAuthentication(err, user) {
            if (err || !user) {
                return reject({
                    message: 'Invalid email or password',
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

        return passport.authenticate('local', { session: false }, doAuthentication)(req, res)
    })
}

module.exports.signup = async function signup(req, res, server) {
    // TODO Rate limit here, because yeah

    // Signup logic

    return {}
}
