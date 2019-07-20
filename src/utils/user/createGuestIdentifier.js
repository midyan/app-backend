const shortid = require('shortid')

const crypto = require('crypto')

const LargestPrimeUnider48Bits = 281474976710597

module.exports = function createGuestIdentifier() {
    const md = crypto.createHash('sha256')

    md.update(new Date().getTime().toString(36) + shortid.generate())

    // Masks the HEX to 48 bits
    const ID = parseInt(md.digest('hex'), 16) % LargestPrimeUnider48Bits

    const hash = ID.toString(36).toUpperCase()

    const segments = hash.match(/.{1,2}/g)

    segments.pop()

    return segments.join('-')
}
