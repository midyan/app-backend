const config = require('../../config')

const mongoose = require('mongoose')
const MongodbMemoryServer = require('mongodb-memory-server').MongoMemoryServer

mongoose.Promise = global.Promise

module.exports = async function testConnection() {
    const server = new MongodbMemoryServer({
        instance: { debug: true },
        binary: { version: '3.6.3' },
    })

    if (!config.isTest) throw new Error('This should not be loaded outside tests.')

    await mongoose.connect(await server.getConnectionString(), {
        useNewUrlParser: true,
        autoReconnect: true,
        reconnectTries: 30,
        reconnectInterval: 1000,
    })
}
