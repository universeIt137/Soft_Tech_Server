const { default: mongoose } = require("mongoose");
const paymentModel = require("../../models/payment/PaymentModel");
const { successResponse, errorResponse } = require("../../utility/response");

exports.MakePayments = async (req, res) => {
    
    const reqBody = req.body;
    try {
        const data = await paymentModel.create(reqBody);
        return successResponse(res, 201, "Request Made successful", data);
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error);
    }
}

exports.GetClientPaymentList = async (req, res) => {
    try {
        const id = req.headers.clientId;
        const filter = {
            client: new mongoose.Types.ObjectId(id),
        };
        const data = await paymentModel.find(filter)
            .populate('client')
            .populate('product')
            .populate('representative');
        
        return successResponse(res, 200, "All data fetched", data);

    } catch (error) {
        
    }
}