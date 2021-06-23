const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        refreshToken: {
            type: String,
            required: true,
        },
    },
    {
        collection: 'tokens'
    }
);

module.exports = mongoose.model('Token', TokenSchema);