const mongoose = require('mongoose');

const pattern = {
    firstName: {
        type: String,
        required: true
    },
    lastName: {
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
        required: true,
        unique: true
    },
    messages: [{String}]
}

const user = new mongoose.Schema(pattern);
const UserModel = mongoose.model('User',user);

module.exports ={
    UserModel
}