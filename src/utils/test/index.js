const test = require('ava')

test.beforeEach(async t => {
    t.context = {}
    t.context.Server = require('./server')
})

module.exports = test
