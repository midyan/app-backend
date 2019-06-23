const loadModels = require('./loadModels')
const connection = require('./connection')
const testConnection = require('./test-connection')

module.exports = async env => {
    if (env === 'test') {
        await testConnection()
    } else {
        await connection()
    }

    loadModels(env)
}
