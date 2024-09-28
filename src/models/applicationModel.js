const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({

  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String , required: true},
  resume: { type: String, required: true },

}, { timestamps: true, versionKey: false });

const applicationModel = mongoose.model('applications', DataSchema);

module.exports = applicationModel;


// email: { type: String,unique: true },
// linkedInProfile: { type: String },
// portfolio: { type: String },
// coverLetter: { type: String },
// technicalSkills: { type: [String]},
// workExperience: [{ jobTitle: String, companyName: String, startDate: Date, endDate: Date, description: String }],
// education: [{ degree: String, institution: String, graduationYear: Number }],
// references: [{ name: String, contactInfo: String, relationship: String }],
// technicalAssessment: { score: Number, feedback: String },
// availability: { type: String },
// salaryExpectations: { type: Number },

// userID: {type:mongoose.Schema.Types.ObjectId},
// carreerID: {type:mongoose.Schema.Types.ObjectId,required:true},