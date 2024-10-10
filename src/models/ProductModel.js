const mongoose = require('mongoose')

const {Schema,model} = mongoose;

const extraSchema = new Schema({
    description_img : { type: String, },
    description_title : { type: String, },
},{_id : true});

const productSchema = new Schema({
    nav_logo: { type: String,  },
    nav_title: { type: String, },
    nav_description: { type: String,  },
    banner_title : { type : String, },
    banner_description: {type : String},
    banner_img : {type: String},
    live_link : {type : String,  },
    proposal_link : {type : String,  },
    feature_title : {type : String,  },
    feature_img : {type : String,  },
    feature_description : {type : String, } ,
    extra_data : [extraSchema],

}, {timestamps: true,versionKey:false})

const ProductModel = model('products', productSchema);
module.exports = ProductModel