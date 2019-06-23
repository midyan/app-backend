const buildConfig = require('./utils/buildConfig')

const allowedEnvs = [
    'test',
    'development',
    'acceptance',
    'staging',
    'production',
]

function buildModules(env = process.env.NODE_ENV || 'development') {
    if (!allowedEnvs.includes(env)) throw new Error(`The NODE_ENV=${env} is not allowed`)

    const config = buildConfig(env)

    return config
}

const CONFIG = {
    build: env => {
        const conf = buildModules(env)

        for (let field in conf) {
            CONFIG[field] = conf[field]
        }
    },
}

CONFIG.build()

module.exports = CONFIG
