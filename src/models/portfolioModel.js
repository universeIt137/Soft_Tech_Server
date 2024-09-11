const mongoose = require("mongoose");
const {model,Schema} =mongoose;

const portfolioSchema = new Schema({
    img : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    live_link : {
        type : String,
    }
},{
    timestamps:true, versionKey:false
});

const portfolioModel = model("Portfolio",portfolioSchema);

module.exports = portfolioModel;