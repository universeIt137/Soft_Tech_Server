const SessionModel = require("../../models/SessionModel");
const { successResponse, errorResponse } = require("../../utility/response");

exports.addSessionVideo = async (req, res) => {
    try {
        let reqBody = req.body;
        let data = await SessionModel.create(reqBody);
        return successResponse(res, 201, "Video uploaded successfully", data);
    } catch (err) {
        console.log(err);
        return errorResponse(res, 500, "Something went wrong", err);
    }
};

exports.getAllSessionVideo = async (req, res) => {
    try {
        let data = await SessionModel.find().sort({ createdAt: -1 });
        return successResponse(res, 200, "All videos fetched successfully", data);
    } catch (err) {
        return errorResponse(res, 500, "Something went wrong", err);
    }
};

exports.singleSessionVideo = async (req, res) => {
    try {
        let id = req.params.id;
        let data = await SessionModel.findById(id);
        if (!data) {
            return errorResponse(res, 404, "Video not found", null);
        }

        return successResponse(res, 200, "Video fetched successfully", data);
    } catch (err) {
        return errorResponse(res, 500, "Something went wrong", err);
    }
};

exports.updateSessionVideo = async (req, res) => {
    try {
        let id = req.params.id;
        let reqBody = req.body;
        let data = await SessionModel.findByIdAndUpdate(id, reqBody, { new: true });

        if (!data) {
            return errorResponse(res, 404, "Video not found", null);
        }

        return successResponse(res, 200, "Video updated successfully", data);

    } catch (err) {
        return errorResponse(res, 500, "Something went wrong", err);
     }
    
}


exports.deleteSessionVideo = async (req, res) => {
    try {
        let id = req.params.id;
        let data = await SessionModel.findByIdAndDelete(id);
        
        if (!data) {
            return errorResponse(res, 404, "Video not found", null);
        }

        return successResponse(res, 200, "Video deleted successfully", data);

    } catch (err) {
        return errorResponse(res, 500, "Something went wrong", err);
    }
}