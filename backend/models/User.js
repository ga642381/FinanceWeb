const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }
});

const collection_name = "users";
const User = mongoose.model('User', UserSchema, collection_name);
module.exports = User;