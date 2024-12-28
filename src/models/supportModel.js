const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const supportSchema = new Schema({
    name : {
        type : String,
    },
    phoneNumber : {
        type : String,
    },
    message : {
        type : String,
    },
    status : {
        type : String,
        default : "pending",
        enum : ["pending", "resolved"]
    },
    clientId : {
        type : Schema.Types.ObjectId,
        ref : 'clients',
    }
},{timestamps: true,versionKey:false});

const supportModel = model('supports', supportSchema);

module.exports = supportModel;