const test = require('./src/utils/test')

test('server should start without errors', async t => {
    const { Server } = t.context

    const server = new Server(9000)

    t.truthy(server.server_id)

    await t.notThrowsAsync(server.start())

    await t.notThrowsAsync(server.stop())
})

test('should signup as guest correctly', async t => {
    const { Request, Server } = t.context

    const server = new Server(8000)

    await server.start()

    const request = new Request(`http://localhost:${server.PORT}`)

    const { status, data } = await request.post('/auth/guest/signup')

    t.is(status, 200)

    t.truthy(data.token)
    t.is(typeof data.token, 'string')
})
