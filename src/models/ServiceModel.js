const mongoose = require('mongoose');

const descriptionSchema = new mongoose.Schema({
  description_logo: { type: String, },
  description_heading : { type: String,  },
  description : {type : String,}
}, { _id: true });

const featureSchema = new mongoose.Schema({
  feature_logo: { type: String, },
  feature_title : { type: String, },
  feature_description : {type : String,}
}, { _id: true });

const serviceSchema = new mongoose.Schema({
  nav_logo : {type : String,},
  nav_title: { type: String,  },
  nav_description: { type: String, },
  main_title : {type : String},
  banner_img :  {type : String,},
  tag_line : {type : String},
  description_feature: [descriptionSchema],
  feature : [featureSchema]
}, { timestamps: true, versionKey: false });

const ServiceModel = mongoose.model('Services', serviceSchema);

module.exports = ServiceModel;
