const Server = require('./src/Server')

const { WEB_CONCURRENCY = 1, PORT = 3000 } = process.env

console.log(`Using ${WEB_CONCURRENCY} workers for web server.`)

async function startServer(port = PORT) {
    const server = new Server(port)

    return await server.start()
}

if (process.argv[2] === 'run') {
    if (WEB_CONCURRENCY === 1) {
        startServer()
    } else {
        let throng = require('throng')

        throng(startServer, {
            workers: WEB_CONCURRENCY,
            lifetime: Infinity,
            grace: 4000,
        })
    }
}

module.exports = startServer
