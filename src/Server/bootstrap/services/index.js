// EX: require('../../utils/mailer')
const services = []

module.exports = env => Promise.all(services.map(service => service.init(env)))
