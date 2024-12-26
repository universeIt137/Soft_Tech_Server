const productVideoModel = require("../../models/productVideoModel");
const { successResponse, errorResponse } = require("../../utility/response");

const productUploadVideo = async (req,res)=>{
    try{
        let reqBody = req.body;
        let data = await productVideoModel.create(reqBody);
        return successResponse(res,201,"Video uploaded successfully",data);
    } catch(error){
        console.log(error);
        return errorResponse(res,500,"Something went wrong",error);
    }
};

const allProductVideos = async (req,res)=>{
    try{
        let data = await productVideoModel.find().sort({ createdAt: -1 });
        return successResponse(res,200,"All videos fetched successfully",data);
    } catch(error){
        console.log(error);
        return errorResponse(res,500,"Something went wrong",error);
    }
};

const singleProductVideo = async (req,res)=>{
    try{
        let id = req.params.id;
        let data = await productVideoModel.findById(id);
        if(!data) return errorResponse(res,404,"Video not found",null);
        return successResponse(res,200,"Video fetched successfully",data);
    } catch(error){
        console.log(error);
        return errorResponse(res,500,"Something went wrong",error);
    }
};

const updateProductVideo = async (req,res)=>{
    try{
        let id = req.params.id;
        let reqBody = req.body;
        let data = await productVideoModel.findByIdAndUpdate(id,reqBody,{new:true});
        if(!data) return errorResponse(res,404,"Video not found",null);
        return successResponse(res,200,"Video updated successfully",data);
    } catch(error){
        console.log(error);
        return errorResponse(res,500,"Something went wrong",error);
    }
};

const deleteProductVideo = async (req,res)=>{
    try{
        let id = req.params.id;
        let data = await productVideoModel.findByIdAndDelete(id);
        if(!data) return errorResponse(res,404,"Video not found",null);
        return successResponse(res,200,"Video deleted successfully",data);
    } catch(error){
        console.log(error);
        return errorResponse(res,500,"Something went wrong",error);
    }
};



module.exports = { productUploadVideo,allProductVideos,singleProductVideo,updateProductVideo,deleteProductVideo };