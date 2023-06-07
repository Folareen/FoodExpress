const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type:String,
        required: true,
        unique: true,
        trim: true,
    },
    phoneNumber: {
        type:String,
        required: true,
        trim: true,
    },
    password: {
        type:String,
        required: true,
        select: false
    },
    address: {
        type: String,
        required: true,
    }
}, {timestamps: true});

const User = model('User', userSchema);

module.exports = User