const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  address: { type: String },
  linkedInProfile: { type: String },
  portfolio: { type: String },
  resume: { type: String, required: true },
  coverLetter: { type: String },
  technicalSkills: { type: [String], required: true },
  workExperience: [{ jobTitle: String, companyName: String, startDate: Date, endDate: Date, description: String }],
  education: [{ degree: String, institution: String, graduationYear: Number }],
  references: [{ name: String, contactInfo: String, relationship: String }],
  technicalAssessment: { score: Number, feedback: String },
  availability: { type: String },
  salaryExpectations: { type: Number },

  userID: {type:mongoose.Schema.Types.ObjectId},
  carreerID: {type:mongoose.Schema.Types.ObjectId,required:true},
}, { timestamps: true, versionKey: false });

const applicationModel = mongoose.model('applications', DataSchema);

module.exports = applicationModel;