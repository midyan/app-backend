const shared = require('../shared')
const modules = require('../modules')

const injectConfig = require('./injectConfig')

module.exports = function(env) {
    let exports = { config: {} }

    // Shared config has to come first, since other configs might rely on it, but they can not rely on each other
    injectConfig(env, exports, shared)

    // Module configs have to be completely independent of each other and might rely only on shared configs
    injectConfig(env, exports, modules)

    return { ...exports.config }
}
