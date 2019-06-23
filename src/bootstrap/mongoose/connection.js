const mongoose = require('mongoose')

const config = require('../../config')

module.exports = async function connection() {
    mongoose.Promise = global.Promise

    try {
        await mongoose.connect(config.mongo.uri, {
            useNewUrlParser: true,
            autoReconnect: true,
            reconnectTries: 30,
            reconnectInterval: 1000,
        })

        mongoose.set('useCreateIndex', true)
    } catch (err) {
        console.log('MongoDB Connection Error. Please make sure that MongoDB is running.', err)

        throw err
    }
}
