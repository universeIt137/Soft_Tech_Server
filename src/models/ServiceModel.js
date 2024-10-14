const mongoose = require('mongoose');

const descriptionSchema = new mongoose.Schema({
  key_point_img: { type: String, },
  key_point_title : { type: String,  },
  key_point_description : {type : String,}
}, { _id: true });

const featureSchema = new mongoose.Schema({
  feature_img: { type: String, },
  feature_title : { type: String, },
  feature_description : {type : String,}
}, { _id: true });

const serviceSchema = new mongoose.Schema({
  nav_logo : {type : String,},
  nav_title: { type: String,  },
  nav_description: { type: String, },

  banner_title : {type : String},
  banner_img :  {type : String,},
  banner_description : {type : String},

  key_point: [descriptionSchema],

  feature : [featureSchema]

}, { timestamps: true, versionKey: false });

const ServiceModel = mongoose.model('Services', serviceSchema);

module.exports = ServiceModel;
