const fs = require('fs')
const path = require('path')

module.exports = function models() {
    const modelsPath = path.resolve(__dirname, '../../models')
    // -- extensions/plugins
    fs.readdirSync(modelsPath)
        .filter(fileName => !fileName.includes('.test.js'))
        .forEach(fileName => {
            require(path.join(modelsPath, fileName))
        })
}
