const supportModel = require("../../models/supportModel");
const { successResponse, errorResponse } = require("../../utility/response");


const sendSupportMessage = async (req, res) => {
    try {
        const reqBody = req.body;
        const result = await supportModel.create(reqBody);
        return successResponse(res, 201, "Support message sent successfully", result);
    } catch (error) {
        console.log(error);
        return errorResponse(res, 500, "Something went wrong", error);
    }

};

const msgStatusUpdate = async (req, res) => {
    try {
        const id = req.params.id;
        const update = {
            status: true,
        }
        const result = await supportModel.findByIdAndUpdate(id, update, { new: true });
        if (!result) return errorResponse(res, 404, "Message not found", null);
        return successResponse(res, 200, "Message status updated successfully", result);
    } catch (error) {
        console.log(error);
        return errorResponse(res, 500, "Something went wrong", error);
    }

};

const allMessage = async (req, res) => {
    try {
        const data = await supportModel.find().sort({ createdAt: -1 });
        return successResponse(res, 200, "All messages fetched successfully", data);
    } catch (error) {
        console.log(error);
        return errorResponse(res, 500, "Something went wrong", error);
    }
};




module.exports = { sendSupportMessage, msgStatusUpdate, allMessage };