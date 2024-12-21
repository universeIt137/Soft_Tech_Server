const mongoose = require('mongoose');

const {Schema,model} = mongoose;

const accountInfoSchema = new Schema({
    accountName : {
        type : String,
    },
    accountNumber : {
        type : String,
    },
    bankName : {
        type : String,
    },
    typeOfAccount : {
        type : String,
    },
    branchName : {
        type : String,
    },
    routingNumber : {
        type : String,
    }
},{
    timestamps: true, versionKey:false
});;

const accountInfoModel = model('account_infos', accountInfoSchema);

module.exports = accountInfoModel;