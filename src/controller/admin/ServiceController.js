const express = require("express");
const ServiceModel = require("../../models/ServiceModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.CreateService = async (req, res) => {
  try {
    let reqBody = req.body;
    const result = await ServiceModel.create(reqBody);
    res.status(200).json({
      status: "success",
      msg: "Service create successfully",
      data: result,
    });
  } catch (e) {
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
    let id = req.params.serviceId;
    let result = await ServiceModel.findOne({ _id: id });
    res.status(200).json({ status: "success", data: result });
  } catch (e) {
    res.status(400).json({ status: "failed" });
  }
};
