const { response } = require("express");
const representativeModel = require("../models/representativeModel");
const { errorResponse, successResponse } = require("../utility/response");
const bcrypt = require('bcrypt');



const createRepresentative = async (req,res)=>{
    try {
        const reqBody = req.body;
        const {phone,password,confirmPassword,name,image,division,distic,upazila,address,nameOfDegree,certificate,year,nidNumber,experience,} = req.body;
        
        const existingRepresentative = await representativeModel.findOne({phone});
        const hashedPassword = await bcrypt.hashSync(password, 10);


        const payload = {
            phone,
            password:hashedPassword,
            name,
            image,
            division,
            distic,
            upazila,
            address,
            nameOfDegree,
            certificate,
            year,
            nidNumber,
            experience,
        }

        if(existingRepresentative){
            return errorResponse(res,409,"User phone number is already in use")
        }

        if(password !==confirmPassword){
            return errorResponse(res,400,"Passwords do not match")
        }

        const data = await representativeModel.create(payload);

        return successResponse(res,201,"User created successfully",data);

    } catch (error) {
        console.log(error)
        return errorResponse(res,500,"Something went wrong",error)
    }
};

const loginRepresentative = async (req,res)=>{
    try {
        
        const {password,phone} = req.body;
        const representative = await representativeModel.findOne({phone});
        if(!representative){
            return errorResponse(res,404,"User not found")
        } 

    } catch (error) {
        
    }
}


module.exports ={
    createRepresentative
}