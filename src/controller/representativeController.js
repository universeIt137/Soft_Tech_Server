const { default: mongoose } = require("mongoose");
const representativeModel = require("../models/representativeModel");
const { errorResponse, successResponse } = require("../utility/response");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const createRepresentative = async (req, res) => {
    try {
        const { phone, password, confirmPassword, referenceId, referUserId, ...otherDetails } = req.body;
        const randomReferNumber = Math.floor(100000 + Math.random() * 900000);
        const repId = req.headers.repId;


        // Check if the phone number is already in use
        const existingRepresentative = await representativeModel.findOne({ phone });
        if (existingRepresentative) {
            return errorResponse(res, 409, "User phone number is already in use");
        }

        // Ensure passwords match
        if (password !== confirmPassword) {
            return errorResponse(res, 400, "Passwords do not match");
        }



        // Create a new representative
        const data = await representativeModel.create({
            ...otherDetails,
            phone,
            password,
            referNumber: randomReferNumber,
            referenceId: referenceId ? referenceId : randomReferNumber,
            referUserId: repId ? repId : "",

        });

        const token = jwt.sign({ id: data._id, role: data.role, phone: data.phone }, process.env.RE_JWT_SECRET, { expiresIn: '10d' });

        return successResponse(res, 201, "User created successfully", {
            data, token,
        });
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error);
    }
};


const registrationStepTwo = async (req, res) => {
    try {
        let id = req.headers.regId;
        let filter = {
            _id: id
        };
        console.log(id);
        const reqBody = req.body;

        // Update the representative's profile
        const data = await representativeModel.findByIdAndUpdate(filter, reqBody, { new: true });

        if (!data) {
            return errorResponse(res, 404, "Profile not found or could not be updated.");
        }

        // Return a success response
        return successResponse(res, 200, "Profile updated successfully", data);
    } catch (error) {
        // Log the error for debugging (if a logging system is available)
        console.error("Error updating profile:", error);

        // Return a generic error response
        return errorResponse(res, 500, "An internal server error occurred.");
    }
};



const updateRoleRepresentative = async (req, res) => {
    const { representative } = req.body;

    try {
        const id = req.params.id;

        // Ensure _id is an ObjectId
        const filter = {
            _id: id,
        };

        // Check if user exists with the given filter
        const user = await representativeModel.findOne(filter);

        const repStatus = user.status === false ? true : false
        const repRole = user.role === "user" ? "representative" : "user"



        if (!user) {
            return res.status(404).send({ success: false, message: "User not found or already updated." });
        }

        // Check if the user already has a representative_id
        if (user.representative_id) {
            // Update only the role and status if representative_id already exists
            const result = await representativeModel.updateOne(filter, {
                $set: {
                    status: repStatus,
                    role: repRole
                }
            });

            return res.send({
                success: true,
                message: "Representative role updated, ID remains unchanged.",
                result
            });
        }

        // If no representative_id exists, generate a new one
        const lastRep = await representativeModel
            .find({ representative_id: { $exists: true } })
            .sort({ representative_id: -1 })
            .limit(1);

        // Generate new representative_id
        let newRepId = "REP-001"; // Default ID
        if (lastRep.length > 0) {
            const lastId = lastRep[0].representative_id;
            const idNumber = parseInt(lastId.split('-')[1]);
            newRepId = `REP-${String(idNumber + 1).padStart(3, '0')}`;
        }



        // Update user with the new representative_id
        const updateTwo = {
            status: repStatus,
            role: repRole,
            representative_id: newRepId,
            representative
        };

        const result = await representativeModel.updateOne(filter, { $set: updateTwo });

        return res.send({
            success: true,
            message: "Representative role and ID successfully updated.",
            result
        });

    } catch (error) {
        console.error("Error updating representative role:", error);
        return res.status(500).send({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
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

        const representative = await representativeModel.findOne(filter);
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


const repProfile = async (req, res) => {
    try {
        const id = req.headers.repId;
        console.log(id);
        const filter = {
            _id: id,
            status: true,
            role: "representative"
        };
        const representative = await representativeModel.findOne(filter);
        return successResponse(res, 200, "Profile find successfully", representative);
    } catch (error) {
        return errorResponse(res, 500, "something went wrong", error);
    }
};


const repUpdateProfile = async (req, res) => {
    try {
        const id = req.headers.repId;
        const update = req.body;
        const representative = await representativeModel.findByIdAndUpdate(id, update, { new: true });
        return successResponse(res, 200, "Profile updated successfully", representative);
    } catch (error) {
        return errorResponse(res, 500, "something went wrong", error);
    }
};


const deleteRepresentative = async (req, res) => {
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
};


const allRepresentatives = async (req, res) => {
    try {
        const representatives = await representativeModel.find().sort({ createdAt: -1 });
        return successResponse(res, 200, "All representatives fetched successfully", representatives);
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error);
    }
};


const validRepresentatives = async (req, res) => {
    try {
        const filter = {
            role: "representative",
            status: true
        };
        const representatives = await representativeModel.find(filter).sort({ createdAt: -1 });
        return successResponse(res, 200, "All valid representatives fetched successfully", representatives);
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error);
    }
};


const representativesByReferNumber = async (req, res) => {
    const id = req.headers.id;
    try {
        const filter = {
            referUserId: id,
            role: "representative",
            status: true
        };
        const data = await representativeModel.find(filter).populate("referenceId", "name phone");
        if (!data) {
            return errorResponse(res, 404, "Representative not found");
        }
        return successResponse(res, 200, "Representatives by refer number fetched successfully", data);
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error);
    }
};

const representativeById = async (req, res) => {
    try {
        const id = req.params.id;
        const representative = await representativeModel.findById(id)
        if (!representative) {
            return errorResponse(res, 404, "Representative not found", null);
        }
        return successResponse(res, 200, "Representative fetched successfully", representative);
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
    deleteRepresentative,
    allRepresentatives,
    validRepresentatives,
    representativesByReferNumber,
    registrationStepTwo,
    representativeById
}