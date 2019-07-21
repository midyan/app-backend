const bootstrap = require('./bootstrap')

const stoppable = require('stoppable')
const API = require('../API')

class Server {
    status = 'idle'
    env = null
    PORT = null
    server = null
    mongoose = null
    services = null

    constructor(PORT, env) {
        this.env = env || 'test'
        this.PORT = PORT || this.randomPort()
    }

    randomPort() {
        return 9000 + Math.round(Math.random() * 1000)
    }

    start() {
        return new Promise(async (resolve, reject) => {
            try {
                const { mongoose, services } = await bootstrap(this.env)

                this.services = services

                this.mongoose = mongoose
                this.models = mongoose.models

                this.server = await API(this)

                this.status = 'running'

                resolve()
            } catch (error) {
                reject(error)
            }
        })
    }

    stop() {
        return new Promise((resolve, reject) => {
            stoppable(this.server).stop(async err => {
                if (err) return reject(err)

                console.log('Server at port', this.PORT, 'stopped')

                this.mongoose = null
                this.services = null
                this.server = null
                this.status = 'idle'

                return resolve()
            })
        })
    }
}

module.exports = Server
