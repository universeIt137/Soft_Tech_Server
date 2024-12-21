const repAccountInfoModel = require("../../models/repAccountInfoModel");
const { successResponse, errorResponse } = require("../../utility/response");


const repCreateBankInfo = async (req,res)=>{
    try {
        const reqBody = req.body;
        const data = await repAccountInfoModel.create(reqBody);
        return successResponse(res,201,"Bank Information Create Successfully",data);
    } catch (error) {
        return errorResponse(res,500, "Something went wrong",error);
    }
};

const repAllBankInformation = async (req,res)=>{
    try {
        const data = await repAccountInfoModel.find().sort({ createdAt: -1 });
        return successResponse(res,200,"All Bank Information Fetched Successfully",data);
    } catch (error) {
        return errorResponse(res,500, "Something went wrong",error);
    }
};

const repBankInformationById = async (req,res)=>{
    try {
        const id = req.params.id;
        const data = await repAccountInfoModel.findById(id);
        if(!data){
            return errorResponse(res,404, "Bank Information not found", null);
        }
        return successResponse(res,200,"Bank Information Fetched Successfully",data);
    } catch (error) {
        return errorResponse(res,500, "Something went wrong",error);
    }
};

const repBankInfoUpdate = async (req,res)=>{
    try {
        const id = req.params.id;
        const reqBody = req.body;
        const data = await repAccountInfoModel.findByIdAndUpdate(id,reqBody,{new: true});
        if(!data){
            return errorResponse(res,404, "Bank Information not found", null);
        }
        return successResponse(res,200,"Bank Information Updated Successfully",data);
    } catch (error) {
        return errorResponse(res,500, "Something went wrong",error);
    }
};

const repBankInfoDelete = async (req,res)=>{
    try {
        const id = req.params.id;
        const data = await repAccountInfoModel.findByIdAndDelete(id);
        if(!data){
            return errorResponse(res,404, "Bank Information not found", null);
        }
        return successResponse(res,200,"Bank Information Deleted Successfully",data);
    } catch (error) {
        return errorResponse(res,500, "Something went wrong",error);
    }

};


module.exports = {repCreateBankInfo,repAllBankInformation,repBankInformationById,repBankInfoUpdate,repBankInfoDelete}