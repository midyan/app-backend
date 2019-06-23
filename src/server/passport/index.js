const guest = require('./guest')

const strategies = { guest }

function setupAll() {
    for (let strategy in strategies) {
        strategies[strategy].setup()
    }
}

module.exports = {
    ...strategies,
    setupAll,
}
