const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const bcrypt = require('bcrypt');
const representativeSchema = new Schema({
    name: {
        type: String,
    },
    phone: {
        type: String,
        unique: true, // Keep unique for phone numbers
        required: true,
    },
    password: {
        type: String,
        required: true,
        set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
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
    address: {
        type: String,
    },
    education: [
        {
            nameOfDegree: {
                type: String,
            },
            certificate: {
                type: String,
            },
            year: {
                type: Number,
            },
        },
    ],
    nidNumber: {
        type: String,
    },
    experience: {
        type: String,
    },
    role: {
        type: String,
        enum: ["user", "representative"],
        default: "user",
    },
    status: {
        type: Boolean,
        default: false,
    },
    referUserId : {
        type : mongoose.Schema.ObjectId,
        ref: 'users',
    },
    referNumber: {
        type: String,
    },
    referenceId: {
        type: String,
    },

}, {
    timestamps: true,
    versionKey: false,
});

const representativeModel = model('representatives', representativeSchema);

module.exports = representativeModel;