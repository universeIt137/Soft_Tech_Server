const CareerModel = require("./../../models/CareerModel");
const ApplicationModel = require("./../../models/applicationModel");

const UserModel = require("./../../models/UserModel");

exports.CreateCareer = async (req, res) => {
  try {
    let reqBody = req.body;

    // Optional: Add validation logic here if needed.
    if (!reqBody || Object.keys(reqBody).length === 0) {
      return res
        .status(400)
        .json({
          status: "failed",
          message: "Request body is empty or invalid",
        });
    }

    // Create the career record
    const result = await CareerModel.create(reqBody);

    // Respond with success status and data
    res.status(200).json({ status: "success", data: result });
  } catch (e) {
    // Log the error for debugging purposes

    // Respond with failure status and error message
    res.status(400).json({ status: "failed", message: e.message });
  }
};

exports.getAllCareer = async (req, res) => {
  try {
    const result = await CareerModel.find();
    res.status(200).json({ status: "success", data: result });
  } catch (e) {
    res.status(400).json({ status: "failed" });
  }
};
exports.updateCareer = async (req, res) => {
  try {
    let reqBody = req.body;
    let careerId = req.params.careerID;
    const result = await CareerModel.updateOne({ _id: careerId }, reqBody);
    res.status(200).json({ status: "success", data: result });
  } catch (e) {
    res.status(400).json({ status: "failed" });
  }
};
exports.getSingleCareer = async (req, res) => {
  try {
    const Careerid = req.params.CareerID;
    const result = await CareerModel.find({ _id: Careerid });
    res.status(200).json({ status: "success", data: result });
  } catch (e) {
    res.status(400).json({ status: "failed" });
  }
};

exports.deleteCareer = async (req, res) => {
  try {
    const Careerid = req.params.CareerID;

    let data = await CareerModel.findOne({ _id: Careerid });
    if (!data)
      return res.status(404).json({
        status: "fail",
        msg: "data not found",
      });
    await CareerModel.findByIdAndDelete({ _id: Careerid });
    res
      .status(200)
      .json({ status: "success", msg: "Career delete successfully" });
  } catch (e) {
    res.status(400).json({ status: "failed", data: e });
  }
};
