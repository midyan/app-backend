const test = require('../test')

test('start server -> ping request -> shutdown server', async t => {
    const server = await t.context.getServer(t, 4000)

    await t.context.setupBaseData(t, server)
})
