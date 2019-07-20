const test = require('ava')

const bootstrap = require('../../bootstrap')

test.before(async t => {
    await bootstrap('test')

    t.context = {}

    t.context.Server = require('./server')
    t.context.Request = require('./request')
})

module.exports = test
