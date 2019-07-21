const Mongoose = require('mongoose').Mongoose

const config = require('../../../config')

module.exports = async function connection() {
    Mongoose.Promise = global.Promise

    try {
        await Mongoose.connect(config.mongo.uri, {
            useNewUrlParser: true,
            autoReconnect: true,
            reconnectTries: 30,
            reconnectInterval: 1000,
        })

        Mongoose.set('useCreateIndex', true)

        return Mongoose
    } catch (err) {
        console.log('MongoDB Connection Error. Please make sure that MongoDB is running.', err)

        throw err
    }
}
