const config = require('../config')

module.exports = async env => {
    config.build(env)

    return Promise.all([
        require('./services')(config.currentEnv),
        require('./mongoose')(config.currentEnv),
    ])
}
