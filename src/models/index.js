module.exports = function start(mongoose) {
    require('./User')(mongoose)

    return mongoose
}
