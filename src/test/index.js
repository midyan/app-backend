const test = require('ava')
const jwt = require('jsonwebtoken')

const config = require('../config')
const Server = require('../Server')
const Request = require('./Request')

test.beforeEach(async t => {
    t.context = {}
    t.context.getServer = getServer
    t.context.setupBaseData = setupBaseData
})

async function setupBaseData(t, server) {
    t.context.request = new Request(server.url)

    const token = await t.context.request.signup('guest')
    const decodedToken = jwt.decode(token, config.jwt_secret)
    const uniqueCode = decodedToken.guest_unique_code.split('-')

    t.is(token.length, 285) // jwt length
    t.is(token, t.context.request.token) // jwt length

    t.is(uniqueCode.length, 4)
    t.true(uniqueCode.every(segment => segment.length === 2))

    t.is(decodedToken.user_type, 'guest')

    t.context.request.logout()

    t.falsy(t.context.request.token)

    const user = await t.context.server.models.User.findOne({ _id: decodedToken._id }).lean()

    const loginToken = await t.context.request.login('guest', {
        guest_unique_code: decodedToken.guest_unique_code,
        guest_authentication_code: user.guest_authentication_code,
    })

    t.is(loginToken, token)

    const decodedLoginToken = jwt.decode(loginToken, config.jwt_secret)
    const uniqueLoginCode = decodedLoginToken.guest_unique_code.split('-')

    t.is(loginToken.length, 285) // jwt length
    t.is(loginToken, t.context.request.token) // jwt length

    t.is(uniqueCode.length, 4)
    t.true(uniqueLoginCode.every(segment => segment.length === 2))

    t.is(decodedLoginToken.user_type, 'guest')

    t.context.request.logout()

    t.falsy(t.context.request.loginToken)

    return t.context.request
}

async function getServer(t, PORT) {
    const server = new Server(PORT)

    t.is(server.status, 'idle')
    t.truthy(server.id)
    t.truthy(server.env)
    t.truthy(server.PORT)
    t.falsy(server.server)
    t.falsy(server.mongoose)
    t.falsy(server.services)

    const runningServer = await server.start()

    t.is(runningServer.status, 'running')

    t.truthy(runningServer.id)
    t.truthy(runningServer.PORT)
    t.truthy(runningServer.server)
    t.truthy(runningServer.models)
    t.truthy(runningServer.mongoose)
    t.truthy(runningServer.services)
    t.is(server.url, `${config.apiUrl}:${PORT || server.PORT}`)

    t.context.server = server
    return runningServer
}

module.exports = test
