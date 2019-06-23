module.exports = function injectConfig(env, exports, config) {
    for (let configName in config) {
        const configBuild = config[configName]

        const configData = configBuild(env, exports.config)

        exports.config = {
            ...exports.config,
            ...configData,
        }
    }
}
