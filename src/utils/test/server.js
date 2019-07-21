const server = require('../../../server')
const shortid = require('shortid')

const stoppable = require('stoppable')

const ports = {}

function getPort() {
    const PORT = 9000 + Math.round(1000 * Math.random())

    if (ports[PORT]) return getPort()

    ports[PORT] = PORT

    return PORT
}

class Server {
    constructor(PORT) {
        this.PORT = PORT || getPort()

        this.server_id = shortid.generate()
    }

    start() {
        return new Promise(async (resolve, reject) => {
            try {
                this.server = await server(this.PORT)

                resolve(this.server)
            } catch (error) {
                reject(error)
            }
        })
    }

    stop() {
        return new Promise((resolve, reject) => {
            stoppable(this.server).stop(err => {
                if (err) return reject(err)

                console.log('Server at port', this.PORT, 'stopped')

                return resolve()
            })
        })
    }
}

module.exports = Server
