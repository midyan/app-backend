const isNotUndefined = el => typeof el !== 'undefined'

module.exports = function setDefaultValue(intendedValue, defaultValue) {
    return isNotUndefined(intendedValue) ? intendedValue : defaultValue
}
