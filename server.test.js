const test = require('./src/utils/test')

const server = require('./server')

test('server should start without errors', async t => {
    await t.notThrowsAsync(server(9999))
})

test('should signup as guest correctly', async t => {
    const { Request } = t.context

    const PORT = 8000

    await server(PORT)

    const request = new Request(`http://localhost:${PORT}`)

    const { status, data } = await request.post('/auth/guest/signup')

    t.is(status, 200)

    t.truthy(data.token)
    t.is(typeof data.token, 'string')
})
