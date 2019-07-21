const uuidv4 = require('uuid/v4')

const userUtils = require('../utils/user')

const UserSchema = new module.exports.mongoose.Schema({
    user_type: {
        type: String,
        enum: [
            'user',
            'guest',
        ],
    },

    guest_unique_code: {
        type: String,
        required: function() {
            return this.type === 'guest'
        },
    },

    guest_authentication_code: {
        type: String,
        required: function() {
            return this.type === 'guest'
        },
    },

    first_name: {
        type: String,
        required: function() {
            return this.type === 'user'
        },
    },

    last_name: {
        type: String,
        required: function() {
            return this.type === 'user'
        },
    },

    google_id: String,
    facebook_id: String,
    last_seen: Date,
    updated_at: Date,
    created_at: {
        type: Date,
        default: Date.now,
    },
})

UserSchema.methods.setDefaultValues = async function() {
    switch (this.user_type) {
        case 'guest':
            this.guest_unique_code = userUtils.createGuestIdentifier()
            this.guest_authentication_code = uuidv4() + '-' + uuidv4()
            break

        default:
            break
    }
}

module.exports.mongoose.model('User', UserSchema)
