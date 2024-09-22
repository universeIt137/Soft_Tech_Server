const express = require("express");
const ServiceModel = require("../../models/ServiceModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;



exports.CreateService = async (req, res) => {
  try{
    const reqBody = req.body;
    const result = await ServiceModel.create(reqBody);
    res.status(201).json({
      status: "success",
      msg: "Service created successfully",
      data: result,
    });
  }catch(err){
    res.status(500).json({
      status: "failed",
      msg: err.toString(),
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
    const { id } = req.params;
    const {
      nav_title,
      nav_description,
      main_title,
      tag_line,
      description_heading,
      description,
      feature_title,
      feature_description,
    } = req.body;

    const updateData = {};
    if (nav_title) updateData.nav_title = nav_title;
    if (nav_description) updateData.nav_description = nav_description;
    if (main_title) updateData.main_title = main_title;
    if (tag_line) updateData.tag_line = tag_line;

    let imageUrls = [];
    if (req.files) {
      if (req.files["nav_logo"]) {
        const result = await cloudinary.uploader.upload(
          req.files["nav_logo"][0].path,
          { folder: "services-img" }
        );
        updateData.nav_logo = result.secure_url;
      }
      if (req.files["banner_img"]) {
        const result = await cloudinary.uploader.upload(
          req.files["banner_img"][0].path,
          { folder: "services-img" }
        );
        updateData.banner_img = result.secure_url;
      }
      if (req.files["description_logo"]) {
        const result = await cloudinary.uploader.upload(
          req.files["description_logo"][0].path,
          { folder: "services-img" }
        );
        updateData.description_feature = [
          {
            description_logo: result.secure_url,
            description_heading,
            description,
          },
        ];
      }
      if (req.files["feature_logo"]) {
        const result = await cloudinary.uploader.upload(
          req.files["feature_logo"][0].path,
          { folder: "services-img" }
        );
        updateData.feature = [
          {
            feature_logo: result.secure_url,
            feature_title,
            feature_description,
          },
        ];
      }
    }

    const updatedService = await ServiceModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      return res.status(404).json({
        status: "fail",
        msg: "Service not found",
      });
    }

    return res.status(200).json({
      status: "success",
      msg: "Service updated successfully",
      data: updatedService,
    });
  } catch (e) {
    console.log(e.toString());
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
