const connection = require('./connection')
const testConnection = require('./test-connection')

const models = require('../../../models')
module.exports = async env => {
    let mongo

    if (env === 'test') {
        mongo = await testConnection()
    } else {
        mongo = await connection()
    }

    return models(mongo)
}
