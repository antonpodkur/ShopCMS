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
        }
    },
    {
        collection: 'users'
    }
);

module.exports = mongoose.model('UserSchema', UserSchema);