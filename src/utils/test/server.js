const server = require('../../../server')
const shortid = require('shortid')

const stoppable = require('stoppable')

class Server {
    constructor(PORT) {
        this.PORT = PORT
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

                return resolve()
            })
        })
    }
}

module.exports = Server
