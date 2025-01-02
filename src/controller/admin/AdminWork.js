const { default: mongoose } = require("mongoose");
const paymentModel = require("../../models/payment/PaymentModel");
const { successResponse, errorResponse } = require("../../utility/response");
const productRequestModel = require("../../models/representativeRelatedModels/ProductReqModel");
const supportModel = require("../../models/supportModel");

exports.getClientsPaymentInfo = async (req, res) => {
    try {
        const id = req.params.id;
        const filter = {
            client: new mongoose.Types.ObjectId(id)
        };
        const data = await paymentModel.find(filter)
            .populate('client')
            .populate('product')
            .populate('representative');
        return successResponse(res, 200, "All data fetched", data);
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error);
    }
}


exports.getClientProductReq = async (req, res) => {
    try {
        const id = req.params.id;
        const filter = {
            client_id: new mongoose.Types.ObjectId(id)
        };

        const data = await productRequestModel.find(filter)
            .populate('client_id')
            .populate('product_id')
            .populate('representative_id');
        return successResponse(res, 200, "All data fetched", data);

    } catch (error) {
        return errorResponse(res, 500, "Something went wrong");
    }
}

exports.getClientSupportMsg = async(req, res) => {
    try {
        const id = req.params.id;
        const filter = {
            clientId: new mongoose.Types.ObjectId(id)
        };

        const data = await supportModel.find(filter);
        return successResponse(res, 200, "All data fetched", data);
       
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error);
    }
}