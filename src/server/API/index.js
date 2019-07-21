const express = require('express')
const morgan = require('express')

const passport = require('./passport')
const busboy = require('express-busboy')
const helmet = require('express')

const config = require('../../config')

const cors_middleware = require('./middlewares/cors')
const error_middleware = require('./middlewares/error')
const sslify_middleware = require('./middlewares/sslify')
const webhook_raw_body = require('./middlewares/webhook-raw-body')

module.exports = port =>
    new Promise(async (resolve, reject) => {
        try {
            const app = express()

            passport.setupAll()

            app.disable('x-powered-by')

            app.disable('etag')

            if (config.isProduction || config.isStaging || config.isTrunk) {
                app.use(sslify_middleware())
            } else {
                app.use(morgan('dev'))
                process.on('unhandledRejection', (reason, promise) =>
                    console.log('UNHANDLED PROMISE REJECTION', reason, promise)
                )
            }

            app.use(webhook_raw_body())

            app.use(helmet())

            busboy.extend(app, { upload: true })

            app.use(cors_middleware())

            app.use('/', require('./public'))
            app.use('/auth', require('./authentication'))

            app.use('*', (req, res) => {
                res.status(404).send()
            })

            app.use(error_middleware())

            if (port !== undefined) {
                const server = await app.listen(port, function() {
                    console.info(`Web server listening at ${port}`)

                    resolve(server)
                })
            } else {
                resolve(app)
            }
        } catch (e) {
            reject(e)
        }
    })
