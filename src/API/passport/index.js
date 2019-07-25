const guest = require('./guest')
const local = require('./local')

const strategies = {
    guest,
    local,
}

function setupAll(server) {
    for (let strategy in strategies) {
        strategies[strategy].setup(server)
    }
}

module.exports = {
    ...strategies,
    setupAll,
}
