const test = require('../utils/test')

const Server = require('.')

test('server', async t => {
    const sever = new Server(4000, 'test')

    await sever.start()
})
