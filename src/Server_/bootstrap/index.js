const config = require('../../config')

module.exports = async env => {
    config.build(env)

    const [
        services,
        mongoose,
    ] = await Promise.all([
        require('./services')(config.currentEnv),
        require('./mongoose')(config.currentEnv),
    ])

    return {
        mongoose,
        services,
    }
}
