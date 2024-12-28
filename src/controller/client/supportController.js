const supportModel = require("../../models/supportModel");
const { successResponse, errorResponse } = require("../../utility/response");


const sendSupportMessage = async (req, res) => {
    const id = req.headers.clientId; // Get representative's id from the header
    const { clientId, ...other } = req.body; // Destructure clientId and other fields
    try {
        // Create the support message
        const result = await supportModel.create({ clientId: id, ...other });

        // Send a success response
        return successResponse(res, 201, "Support message sent successfully", result);
    } catch (error) {
        console.error(error);

        // Send an error response
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
        // join with client model

        const joinWithClientModel = {
            $lookup: {
                from: "clients",
                localField: "clientId",
                foreignField: "_id",
                as: "clientDetails"
            }
        };

        const joinWithRepresentativeModel = {
            $lookup: {
                from: "representatives",
                localField: "clientDetails.representativeId",
                foreignField: "_id",
                as: "representativeDetails"
            }
        };

        let unwindClientDetails = {
            $unwind: "$clientDetails"
        };

        let unwindRepresentativeDetails = {
            $unwind: "$representativeDetails"
        };

        const projectionData = {
            $project: {
                name: 1,
                phoneNumber: 1,
                message: 1,
                status: 1,
                status : 1,
                createdAt: 1,
                createdAt : 1,
                updatedAt : 1,
                "clientDetails.name" : 1,
                "clientDetails.phone" : 1,
                "representativeDetails.name" : 1,
                "representativeDetails.phone" : 1,

            }
        }

        const sortData = {
            $sort: { createdAt: -1 }
        };


        const result = await supportModel.aggregate([
            joinWithClientModel, joinWithRepresentativeModel, unwindClientDetails, unwindRepresentativeDetails,projectionData,sortData
        ]);


        return successResponse(res, 200, "Messages fetched successfully", result);



    } catch (error) {
        console.log(error);
        return errorResponse(res, 500, "Something went wrong", error);
    }
};

const singleMessage = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await supportModel.findById(id);
        if (!data) return errorResponse(res, 404, "Message not found", null);
        return successResponse(res, 200, "Message fetched successfully", data);
    } catch (error) {
        console.log(error);
        return errorResponse(res, 500, "Something went wrong", error);
    }

};

const deleteMessage = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await supportModel.findByIdAndDelete(id);
        if (!result) return errorResponse(res, 404, "Message not found", null);
        return successResponse(res, 200, "Message deleted successfully", result);
    } catch (error) {
        console.log(error);
        return errorResponse(res, 500, "Something went wrong", error);
    }

};



module.exports = { sendSupportMessage, msgStatusUpdate, allMessage, singleMessage, deleteMessage };