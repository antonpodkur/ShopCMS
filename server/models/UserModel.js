const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        isActivated: {
            type: Boolean,
            default: false
        },
        activationLink: {
            type: String
        }
    },
    {
        collection: 'users'
    }
);

module.exports = mongoose.model('User', UserSchema);