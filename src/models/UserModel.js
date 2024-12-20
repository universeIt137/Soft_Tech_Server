const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const bcrypt = require('bcrypt');

const userModelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    profilePhoto: {
        type: String,
    },
    contactNumber: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ["user", "admin", "representative"],
        default: "user"
    }
}, { timestamps: true, versionKey: false })
const UserModel = model('users', userModelSchema);
module.exports = UserModel;   