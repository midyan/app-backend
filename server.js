const server = require('./src/server')

const { WEB_CONCURRENCY = 1, PORT = 3000 } = process.env

console.log(`Using ${WEB_CONCURRENCY} workers for web server.`)

async function startServer(port = PORT) {
    await server(port, false)
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
