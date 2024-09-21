const express = require("express");
const ServiceModel = require("../../models/ServiceModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const cloudinary = require("../../utility/cludinary");

exports.CreateService = async (req, res) => {
  try {
    let {
      nav_title,
      nav_description,
      main_title,
      tag_line,
      description_heading,
      description,
      feature_description,
      feature_title,
    } = req.body;

    // ফাইল আপলোডের জন্য req.files ব্যবহার করুন
    let imageUrls = [];
    if (req.files) {
      if (req.files['nav_logo']) {
        const result = await cloudinary.uploader.upload(req.files['nav_logo'][0].path, { folder: "services-img" });
        imageUrls.push(result.secure_url);
      }
      if (req.files['banner_img']) {
        const result = await cloudinary.uploader.upload(req.files['banner_img'][0].path, { folder: "services-img" });
        imageUrls.push(result.secure_url);
      }
      if (req.files['description_logo']) {
        const result = await cloudinary.uploader.upload(req.files['description_logo'][0].path, { folder: "services-img" });
        imageUrls.push(result.secure_url);
      }
      if (req.files['feature_logo']) {
        const result = await cloudinary.uploader.upload(req.files['feature_logo'][0].path, { folder: "services-img" });
        imageUrls.push(result.secure_url);
      }
    }

    const newService = new ServiceModel({
      nav_title,
      nav_description,
      main_title,
      tag_line,
      nav_logo : imageUrls[0],
      banner_img : imageUrls[1],
      description_feature: [
        { 
          description_logo: imageUrls[2], 
          description_heading, 
          description 
        }
      ],
      feature: [
        { 
          feature_logo: imageUrls[3], 
          feature_title, 
          feature_description 
        }
      ]
  });
    

    const data = await newService.save();

    return res.status(201).json({
      status: "success",
      msg: "Service created successfully",
      data: data,
    });
  } catch (e) {
    console.log(e.toString());
    res.status(500).json({
      status: "fail",
      msg: e.toString(),
    });
  }
};



exports.getAllService = async (req, res) => {
  try {
    const result = await ServiceModel.find();
    res.status(200).json({
      status: "success",
      msg: "Get all service find successfully",
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      status: "failed",
      msg: e.toString(),
    });
  }
};

exports.updateService = async (req, res) => {
  try {
    const reqBody = req.body;
    const id = req.params.id;
    let update = reqBody;
    let filter = { _id: id };
    const data = await ServiceModel.findById({ _id: id });
    if (!data)
      return res.status(404).json({
        status: "fail",
        msg: "Service not found",
      });
    let updateData = await ServiceModel.findByIdAndUpdate(filter, update, {
      new: true,
    });
    return res.status(200).json({
      status: "success",
      msg: "Service update successfully",
      data: updateData,
    });
  } catch (e) {
    res.status(500).json({
      status: "fail",
      msg: e.toString(),
    });
  }
};

exports.deleteService = async (req, res) => {
  try {
    let id = req.params.id;
    let result = await ServiceModel.findById({ _id: id });
    if (!result)
      return res.status(404).json({
        status: "fail",
        msg: "Service not found",
      });

    await ServiceModel.findByIdAndDelete({ _id: id });

    return res.status(200).json({
      status: "success",
      msg: "Service delete successfully",
    });
  } catch (e) {
    res.status(500).json({
      status: "fail",
      msg: e.toString(),
    });
  }
};

exports.getServiceById = async (req, res) => {
  try {
    let id = req.params.id;
    let result = await ServiceModel.findOne({ _id: id });
    res.status(200).json({
      status: "success",
      msg: "Service find by id successfully",
      data: result,
    });
  } catch (e) {
    res.status(400).json({ status: "failed" });
  }
};
