const supportModel = require("../../models/supportModel");
const { successResponse } = require("../../utility/response");


const sendSupportMessage = async (req,res)=>{
    try {
        const reqBody = req.body;
        const result = await supportModel.create(reqBody);
        return successResponse(res,201,"")
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            msg: "Failed to send support message"
        });
    }
 
}