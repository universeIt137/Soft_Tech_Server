const mongoose = require("mongoose");
const {Schema,model} = mongoose;



const clientProductSchema = new Schema({
    productCategory : {
        type : mongoose.Types.ObjectId,
        ref : "productCategoryModel"
    },
    productExtraDes : {
        type : String
    },
    duraction : {
        type : String
    }
},{timestamps:true,versionKey:false});

const clientProductModel = model("Client-ProductList", clientProductSchema);

module.exports = clientProductModel;