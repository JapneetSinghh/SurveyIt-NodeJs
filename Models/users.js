const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    userType: {
        type: String,
        required: true
    },
    dateCreated: {
        type: String,
        required: true
    },
    timeCreated: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema);