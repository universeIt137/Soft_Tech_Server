const { response } = require("express");
const representativeModel = require("../models/representativeModel");
const { errorResponse, successResponse } = require("../utility/response");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const createRepresentative = async (req, res) => {
    try {
        const reqBody = req.body;
        const { phone, password, confirmPassword, } = req.body;

        const existingRepresentative = await representativeModel.findOne({ phone });


       

        if (existingRepresentative) {
            return errorResponse(res, 409, "User phone number is already in use")
        }

        if (password !== confirmPassword) {
            return errorResponse(res, 400, "Passwords do not match")
        }

        const data = await representativeModel.create(reqBody);

        return successResponse(res, 201, "User created successfully", data);

    } catch (error) {
        console.log(error)
        return errorResponse(res, 500, "Something went wrong", error)
    }
};

const updateRoleRepresentative = async(req,res)=>{
    try {
        const id = req.params.id
        const filter = {
            _id : id,
            status : false,
            role : "user"
        };
        const update = {
            status : true,
            role : "representative"
        };

        const result = await representativeModel.findByIdAndUpdate(filter, update, { new: true });

        if (!result) {
            return errorResponse(res, 404, "Representative not found")
        }

        return successResponse(res, 200, "Representative role updated successfully", result);



    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error); 
    }
};


const loginRepresentative = async (req, res) => {
    try {

        const { password, phone } = req.body;
        const filter = {
            phone,
            status: true,
            role: "representative"
        }

        const representative = await representativeModel.findOne(filter );
        if (!representative) {
            return errorResponse(res, 404, "User not found")
        }
        const isMatch = await bcrypt.compareSync(password, representative.password);
        if (!isMatch) {
            return errorResponse(res, 400, "Invalid password")
        }

        const representativeToken = jwt.sign({ id: representative._id, role: representative.role, phone: representative.phone }, process.env.RE_JWT_SECRET, { expiresIn: '10d' });

        return successResponse(res, 200, "Representative Logged in successfully", data = { representative, representativeToken });



    } catch (error) {
        errorResponse(res, 500, "Something went wrong", error);
    }
};

const repProfile = async (req,res)=>{
    try {
        const id = req.headers.id;
        console.log(id);
        const filter = {
            _id : id,
            status : true,
            role : "representative"
        };
        const representative = await representativeModel.findOne(filter);
        return successResponse(res,200,"Profile find successfully", representative);
    } catch (error) {
        return errorResponse(res,500,"something went wrong", error);
    }
};

const repUpdateProfile = async (req,res)=>{
    try {
        const id = req.headers.id;
        const update = req.body;
        const representative = await representativeModel.findByIdAndUpdate(id, update, {new: true});
        return successResponse(res,200,"Profile updated successfully", representative);
    } catch (error) {
        return errorResponse(res,500,"something went wrong", error);
    }
}

const deleteRepresentative = async (req,res)=>{
    try {
        const id = req.params.id;
        const representative = await representativeModel.findByIdAndDelete(id);
        if (!representative) {
            return errorResponse(res, 404, "Representative not found")
        }
        return successResponse(res, 200, "Representative deleted successfully", representative);
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error);
    }
}


module.exports = {
    createRepresentative,
    loginRepresentative,
    repProfile,
    updateRoleRepresentative,
    repUpdateProfile,
    deleteRepresentative
}