const test = require('../test')

test('start server -> ping request -> shutdown server', async t => {
    const server = await t.context.getServer()

    t.is(server.status, 'running')

    t.truthy(server.id)
    t.truthy(server.PORT)
    t.truthy(server.server)
    t.truthy(server.models)
    t.truthy(server.mongoose)
    t.truthy(server.services)
})
