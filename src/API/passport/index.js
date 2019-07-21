const guest = require('./guest')

const strategies = { guest }

function setupAll(server) {
    for (let strategy in strategies) {
        strategies[strategy].setup(server)
    }
}

module.exports = {
    ...strategies,
    setupAll,
}
