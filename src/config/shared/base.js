const { setDefaultValue } = require('../../utils/object')

module.exports = env => {
    // Default values. env === development by default
    let sessionKey = setDefaultValue(process.env.SUP_SESSION_KEY, 'sup.dev.session')
    let sessionSecret = setDefaultValue(process.env.SUP_SESSION_SECRET, '1234')

    let apiUrl = setDefaultValue(process.env.API_URL, 'http://localhost')
    let jwt_secret = setDefaultValue(process.env.JWT_TOKEN, 'test1234')

    switch (env) {
        case 'test': // SAME AS DEVELOPMENT
        case 'development':
            break
        case 'acceptance':
        case 'staging':
        case 'production':
            apiUrl = process.env.API_URL
            sessionKey = process.env.SUP_SESSION_KEY
            sessionSecret = process.env.SUP_SESSION_SECRET
            jwt_secret = process.env.JWT_TOKEN
            break

        default:
            break
    }

    return {
        jwt_secret,
        sessionKey,
        sessionSecret,

        isTest: env === 'test',
        isDevelopment: env === 'development',
        isAcceptance: env === 'acceptance',
        isStaging: env === 'staging',
        isProduction: env === 'production',

        currentEnv: env,

        // ISO-639-2 language codes that are supported
        supportedLanguageCodes: [
            'de',
            'en',
        ],

        apiUrl,
    }
}
