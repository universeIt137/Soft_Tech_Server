const express = require("express");
const ServiceModel = require("../../models/ServiceModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;



exports.CreateService = async (req, res) => {
  try{
    const reqBody = req.body;
    console.log(reqBody);
    const result = await ServiceModel.create(reqBody);
    res.status(201).json({
      status: "success",
      msg: "Service created successfully",
      data: result,
    });
  }catch(err){
    console.log(err.toString());
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

exports.updateService = async (req,res)=>{
  try {
    let id = req.params.id;
    console.log(id);
    let reqBody = req.body;
    let filter = {_id : id};
    let update = reqBody;
    let data = await ServiceModel.findById(filter);
    if(!data) return res.status(404).json({
        status:"fail",
        msg : "Service not found"
    });
    const updatedService = await ServiceModel.findByIdAndUpdate(
      filter,
      update,
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      status: "success",
      msg: "Service updated successfully",
      data: updatedService,
    })

  } catch (error) {
    return res.status(500).json({
      status: "fail",
      msg: error.toString(),
    })
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

exports.deleteService = async (req, res) => {
  try {
    let id = req.params.id;
    let filter = {_id : id};
    let data = await ServiceModel.findOne(filter);
    if(!data) return res.status(404).json({
        status:"fail",
        msg : "Service not found"
    });
    await ServiceModel.findByIdAndDelete(filter);
    return res.status(200).json({
      status: "success",
      msg: "Service deleted successfully",
    });
  } catch (e) {
    res.status(400).json({ status: "failed" });
  }
};
