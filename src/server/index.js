const shortid = require('shortid')
const stoppable = require('stoppable')

const API = require('../API')
const bootstrap = require('./bootstrap')

class Server {
    status = 'idle'
    id = null
    env = null
    PORT = null
    server = null
    mongoose = null
    services = null

    constructor(PORT, env) {
        this.env = env || 'test'
        this.PORT = PORT || this.randomPort()

        this.id = shortid.generate()
    }

    randomPort() {
        return 9000 + Math.round(Math.random() * 1000)
    }

    start() {
        if (this.status !== 'idle') throw new Error('Server already running')

        return new Promise(async (resolve, reject) => {
            try {
                const { mongoose, services } = await bootstrap(this.env)

                this.services = services
                this.mongoose = mongoose
                this.models = this.mongoose.models

                this.server = await API(this)

                this.status = 'running'

                resolve(this)
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

                return resolve(this)
            })
        })
    }
}

module.exports = Server
