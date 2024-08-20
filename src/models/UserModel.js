const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userModelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String,
    },
    contactNumber: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
    },
   
}, { timestamps: true, versionKey: false })
const UserModel = model('users', userModelSchema);
module.exports = UserModel;   