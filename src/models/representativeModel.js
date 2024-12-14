const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const representativeSchema = new Schema({
    name: {
        type: String,
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
    },
    image: {
        type: String,
    },
    division: {
        type: String,
    },
    distic: {
        type: String,
    },
    upazila: {
        type: String,
    },
    address : {
        type: String,
    },
    education : [
        {
            nameOfDegree: {
                type: String,
            },
            certificate: {
                type: String,
            },
            year: {
                type: Number,
            }
        }
    ],
    nidNumber : {
        type: String,
    },
    experience : {
        type: String,
    },
    role : {
        type: String,
        enum: ["user", "representative"],
        default: "user"
    },
    status : {
        type: String,
        enum: ["true", "false"],
        default: "false"
    }


}, {
    timestamps: true, versionKey: false
});

const representativeModel = model('representatives', representativeSchema);

module.exports = representativeModel;