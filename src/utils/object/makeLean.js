module.exports = function makeLean(obj) {
    if (!obj) return obj

    if (obj.toJSON) return obj.toJSON()
    if (obj.toObject) return obj.toObject()

    return obj
}
