const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema, model } = mongoose;

const clientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
        required: true
    },
    address: {
        type: String,
    },
    clientImage: {
        type: String,
    },
    businessType: {
        type: String,
    },
    representativeId : {
        type: Schema.Types.ObjectId,
        ref: "representatives"
    },
    role: {
        type: String,
        enum: ["user", "client"],
        default: "user",
    },
    status: {
        type: Boolean,
        default: false,
    },
    productType : {
        type : String,
    },
    adminId : {
        type : Schema.Types.ObjectId,
        ref : 'admins',
    }
}, {
    timestamps: true, versionKey: false
});

const clientModel = model("clients", clientSchema);


module.exports = clientModel;