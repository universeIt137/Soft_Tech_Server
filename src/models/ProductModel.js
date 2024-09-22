const mongoose = require('mongoose')

const {Schema,model} = mongoose;

const extraSchema = new Schema({
    extra_description : { type: String, },
    description_img : { type: String, },
    description_title : { type: String, },
},{_id : true});

const productSchema = new Schema({
    nav_logo: { type: String,  },
    nav_title: { type: String, },
    nav_description: { type: String,  },
    main_title : { type : String, },
    live_link : {type : String,  },
    short_description : {type : String,   },
    proposal_link : {type : String,  },
    feature : {type : String,  },
    feature_logo : {type : String,  },
    extra_data : [extraSchema],

}, {timestamps: true,versionKey:false})

const ProductModel = model('products', productSchema);
module.exports = ProductModel