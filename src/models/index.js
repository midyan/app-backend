module.exports = function start(mongoose) {
    return {
        mongoose,
        UserModel: require('./User')(mongoose),
    }
}
