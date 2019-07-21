const config = require('../../config')

module.exports = async env => {
    config.build(env)

    const [
        services,
        mongo,
    ] = Promise.all([
        require('./services')(config.currentEnv),
        require('./mongoose')(config.currentEnv),
    ])

    return {
        mongo,
        services,
    }
}
