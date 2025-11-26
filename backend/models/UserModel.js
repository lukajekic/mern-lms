const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: Array,
        required: true
    },
    profileimage: {
        type: String,
        required: true
    },


}, {timestamps: true})

const model = mongoose.model('User', schema, 'users')
module.exports = model