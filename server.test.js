const test = require('ava')

const server = require('./server')

test('server should start without errors', async t => {
    await t.notThrowsAsync(server(9999))
})
