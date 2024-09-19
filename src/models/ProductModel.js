const mongoose = require('mongoose')

const {Schema,model} = mongoose;

const extraSchema = new Schema({
    extra_description : { type: String, required: true },
    description_img : { type: String, required: true },
    description_title : { type: String, required: true },
},{_id : true});

const productSchema = new Schema({
    nav_logo: { type: String, required: true },
    nav_title: { type: String, required: true },
    nav_description: { type: String, required: true },
    main_title : { type : String, required : true },
    live_link : {type : String, required : true  },
    short_description : {type : String, required : true  },
    proposal_link : {type : String, required : true  },
    feature : {type : String, required : true  },
    feature_logo : {type : String, required : true  },
    extra_data : [extraSchema],

}, {timestamps: true,versionKey:false})

const ProductModel = model('products', productSchema);
module.exports = ProductModel