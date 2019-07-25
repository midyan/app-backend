const test = require('../test')

test('start server -> setup base data -> shutdown server', async t => {
    const server = await t.context.getServer(t)

    await t.context.setupBaseData(t, server)
})

