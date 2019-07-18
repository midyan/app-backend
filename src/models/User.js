const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    user_type: {
        type: String,
        enum: [
            'user',
            'guest',
        ],
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

module.exports = mongoose.model('User', UserSchema)
