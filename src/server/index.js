const config = require('../config')
const bootstrap = require('./bootstrap')

const stoppable = require('stoppable')
const API = require('./API')

class Server {
    status = 'idle'
    env = null
    PORT = null
    server = null
    mongoose = null
    services = null

    constructor(PORT, env) {
        this.PORT = PORT
        this.env = env
    }

    start() {
        return new Promise(async (resolve, reject) => {
            // bootstrap
            // run api

            const { mongo, services } = await bootstrap(this.env)

            this.mongoose = mongo
            this.services = services
            this.server = await API(this.PORT)
            this.status = 'running'
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
