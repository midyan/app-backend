const test = require('ava')

test.beforeEach(async t => {
    t.context = {}
    t.context.useServer = useServer
    t.context.useTunnel = () => {}
})

function useServer() {}

module.exports = test
