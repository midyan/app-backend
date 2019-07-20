const uuidv4 = require('uuid/v4')

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const { getUserIdentity } = require('../../utils/identity')

const config = require('../../config')

const jwt = require('jsonwebtoken')
const UserModel = require('../../models/User')

module.exports = {
    authFields: {
        usernameField: '_id',
        passwordField: 'guest_authentication_code',
    },
}

module.exports.verifyCrendentials = async function verifyCrendentials(
    user_id,
    guest_authentication_code,
    cb
) {
    try {
        const user = await UserModel.findOne({
            _id: user_id,
            guest_authentication_code,
        })

        if (!user) {
            return cb(null, false, { message: 'Incorrect email or password.' })
        }

        return cb(null, user, { message: 'Logged In Successfully' })
    } catch (error) {
        cb(error)
    }
}

module.exports.setup = function guestSetup() {
    const localStrategy = new LocalStrategy(module.exports.authFields, module.exports.verifyCrendentials)

    return passport.use(localStrategy)
}

module.exports.login = function login(req, res) {
    function doAuthentication(err, user) {
        if (err || !user)
            return res.status(400).json({
                message: 'Something is not right',
                user: user,
            })

        return req.login(user, { session: false }, async err => {
            if (err) {
                res.send(err)

                return
            }

            const identity = await getUserIdentity(user)

            const token = jwt.sign(identity, config.jwt_secret)

            return res.json({
                user,
                token,
            })
        })
    }

    return passport.authenticate('local', { session: false }, doAuthentication)(req, res)
}

module.exports.signup = async function signup() {
    // TODO Rate limit here, because yeah
    const user = await new UserModel({ user_type: 'guest' }).save()

    user.setDefaultValues()

    const identity = await getUserIdentity(user)

    const token = jwt.sign(identity, config.jwt_secret)

    return { token }
}
