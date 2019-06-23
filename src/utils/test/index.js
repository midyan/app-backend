const test = require('ava')

const bootstrap = require('../../bootstrap')

test.before(async () => {
    await bootstrap('test')
})

module.exports = test
