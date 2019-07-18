const { setDefaultValue } = require('../../utils/object')

module.exports = env => {
    // Default values. env === development by default
    let mongoURI = setDefaultValue(process.env.MONGODB_URI, 'mongodb://127.0.0.1:27017/campai')

    switch (env) {
        case 'test': // SAME AS DEVELOPMENT
        case 'development':
            break
        case 'acceptance':
        case 'staging':
        case 'production':
            mongoURI = process.env.MONGODB_URI
            break

        default:
            break
    }

    return { mongo: { uri: mongoURI } }
}
