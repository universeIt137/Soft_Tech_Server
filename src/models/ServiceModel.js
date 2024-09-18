const mongoose = require('mongoose');

const descriptionSchema = new mongoose.Schema({
  description_logo: { type: String, required: true },
  description_heading : { type: String, required: true },
  description : {type : String,required : true}
}, { _id: false });

const featureSchema = new mongoose.Schema({
  feature_logo: { type: String, required: true },
  feature_title : { type: String, required: true },
  feature_description : {type : String,required : true}
}, { _id: false });

const serviceSchema = new mongoose.Schema({
  nav_logo : {type : String,required : true},
  nav_title: { type: String, required: true },
  nav_description: { type: String, required: true },
  main_title : {type : String,required : true},
  banner_img :  {type : String, required : true},
  tag_line : {type : String},
  description_feature: [descriptionSchema],
  feature : [featureSchema]
}, { timestamps: true, versionKey: false });

const ServiceModel = mongoose.model('Services', serviceSchema);

module.exports = ServiceModel;
