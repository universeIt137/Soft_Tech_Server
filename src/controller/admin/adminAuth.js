const { successResponse, errorResponse } = require('../../utility/response');
const { EncodeToken, AdminEncodeToken } = require('../../utility/TokenHelper');
const UserModel = require('./../../models/UserModel')
require('dotenv').config()
const jwt = require('jsonwebtoken');


exports.CreateAdmin = async (req, res) => {
    try {
        const { name, contactNumber, password, profilePhoto, email } = req.body;

        // Validate input
        if (!name || !contactNumber || !password) {
            return res.status(400).json({ status: "Failed", data: "Please provide name, contactNumber, and password" });
        }

        // Check if admin user already exists
        const user = await UserModel.findOne({ contactNumber });
        if (user) {
            return res.status(409).json({ status: "Failed", data: "User phone number already exists" });
        }
        const newAdmin = new UserModel({
            name,
            contactNumber,
            password,
            contactNumber,
            profilePhoto,
            role: 'user',
            email: email
        });

        await newAdmin.save()



        res.status(201).json({ status: 'Success', data: newAdmin });


    } catch (e) {
        console.error(e);
        res.status(500).json({ status: 'Failed', data: 'An error occurred during admin creation' });
    }
};


exports.Adminlogin = async (req, res) => {
    try {
        const { contactNumber, password } = req.body;

        if (!contactNumber || !password) {
            return res.status(400).json({ status: "Failed", data: "Please provide both contactNumber and password" });
        }

        // Find the user by contactNumber
        const user = await UserModel.findOne({ contactNumber });

        if (!user) {
            return res.status(400).json({ status: "Failed", data: "Invalid contactNumber or password" });
        }

        // Check if the password matches
        if (user.password !== password) {
            return res.status(400).json({ status: "Failed", data: "Invalid contactNumber or password" });
        }

        // Check if the role is 'admin'
        if (user.role !== 'admin') {
            return res.status(403).json({ status: "Failed", data: "Access denied. Admins only." });
        }

        const token = EncodeToken(contactNumber, user._id.toString(), "admin");

        let CookieOption = { expires: new Date(Date.now() + 24 * 60 * 60 * 1000), httpOnly: false };

        res.cookie('Admintoken', token, CookieOption);
        res.status(200).json({ status: "success", message: 'Login success', token: token, data: user });

    } catch (e) {
        res.status(500).json({ status: 'Failed', data: 'An error occurred during login' });
    }
};
exports.getAdminProfile = async (req, res) => {
    try {

        let user_id = req.headers.user_id
        let result = await UserModel.findOne({ _id: user_id })
        res.status(200).json({ status: "success", data: result })
    } catch (e) {
        res.status(500).json({ status: 'Failed', data: e.toString() });
    }
};


exports.allUsers = async (req, res) => {
    try {
        let result = await UserModel.find()
        return successResponse(res, 200, "All Users find successfully", result)
    } catch (e) {
        return errorResponse(res, 500, "Something went wrong", error);
    }
};


exports.statusUpdate = async (req, res) => {
    try {
        const id = req.params.id; // Extract user ID from request parameters

        // Find the user by ID
        const user = await UserModel.findById(id);
        if (!user) {
            return errorResponse(res, 404, "User not found", null);
        }

        // Toggle status and role
        const userStatus = user.isAdmin === false ? true : false; // Toggle status
        const userRole = user.role === "admin" ? "user" : "admin"; // Toggle role

        // Update the user
        const update = {
            isAdmin: userStatus,
            role: userRole,
        };

        const updatedUser = await UserModel.findByIdAndUpdate(id, update, { new: true });

        // Respond with the updated user
        return successResponse(res, 200, "Status updated successfully", updatedUser);
    } catch (error) {
        console.error("Error updating user status:", error);
        return errorResponse(res, 500, "Something went wrong", error);
    }
};

exports.singleUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserModel.findById(id);
        if (!user) {
            return errorResponse(res, 404, "User not found", null);
        }
        return successResponse(res, 200, "User fetched successfully", user);
    } catch (e) {
        return errorResponse(res, 500, "Something went wrong", e.toString());
    }
}