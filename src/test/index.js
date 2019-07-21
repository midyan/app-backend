const test = require('ava')

const Server = require('../Server')

test.beforeEach(async t => {
    t.context = {}
    t.context.getServer = getServer
    t.context.useTunnel = () => {}
})

async function getServer(PORT) {
    const server = new Server(PORT)

    const runningServer = await server.start()

    return runningServer
}

module.exports = test
