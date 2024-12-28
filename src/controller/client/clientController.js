const { default: mongoose } = require("mongoose");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const clientModel = require("../../models/clientModel");
const { errorResponse, successResponse } = require("../../utility/response");


const createClient = async (req, res) => {
    const id = req.headers.repId;
    const repId = new mongoose.Types.ObjectId(id);
    try {
        const { phone, representative, ...otherDetails } = req.body;

        // Check if the phone number is already in use
        const existingClient = await clientModel.findOne({ phone });


        if (existingClient) {
            return errorResponse(res, 409, "Phone already in use", null);
        }

        // Create a new client
        const data = await clientModel.create({ ...otherDetails, phone, representativeId: repId });

        return successResponse(res, 201, "Client created successfully", data);
    } catch (error) {
        console.error(error);
        return errorResponse(res, 500, "Something went wrong", error);
    }
};
// client role update admin
const clientRoleUpdate = async (req, res) => {
    try {
        const id = req.params.id;
        const filter = {
            _id: id,
        };
        const user = await clientModel.findById(filter);
        if (!user) return errorResponse(res, 404, "Client not found", null);
        const updateRole = user.role === "client" ? "user" : "client";
        const updateStatus = user.status === true ? false : true;
        const update = {
            role: updateRole,
            status: updateStatus,
        };

        const updatedUser = await clientModel.updateOne(filter, { $set: update }, { upsert: true });

        return successResponse(res, 200, "Client role update successfully", updatedUser);


    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error);
    }
};
// manage client admin 

const allClientAdmin = async (req, res) => {
    try {
        const client = await clientModel.find().sort({ createdAt: -1 });
        if (!client) return errorResponse(res, 404, "User not found", null);
        return successResponse(res, 200, "Client fetch successfully", client);
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error);
    }
};

const clientByIdAdmin = async (req, res) => {
    try {
        const id = req.params.id;
        const filter = {
            _id: id
        };
        const client = await clientModel.findById(filter);
        if (!client) {
            return errorResponse(res, 404, "Client not found", null);
        }
        return successResponse(res, 200, "Client fetched successfully", client);
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error);
    }
};

const clientCreateByAdmin = async (req, res) => {
    const id = req.headers.id;
    const adminId = new mongoose.Types.ObjectId(id);
    try {
        const { phone, representative, ...otherDetails } = req.body;

        // Check if the phone number is already in use
        const existingClient = await clientModel.findOne({ phone });


        if (existingClient) {
            return errorResponse(res, 409, "Phone already in use", null);
        }

        // Create a new client
        const data = await clientModel.create({ ...otherDetails, phone, adminId: adminId });

        return successResponse(res, 201, "Client created successfully", data);
    } catch (error) {
        console.error(error);
        return errorResponse(res, 500, "Something went wrong", error);
    }
};

const clientLogin = async (req, res) => {
    try {

        const { password, phone } = req.body;
        const filter = {
            phone,
            status: true,
            role: "client"
        }

        const client = await clientModel.findOne(filter);
        if (!client) {
            return errorResponse(res, 404, "User not found", null);
        }
        const isMatch = await bcrypt.compareSync(password, client.password);
        if (!isMatch) {
            return errorResponse(res, 400, "Invalid password", null);
        }

        const clientToken = jwt.sign({ id: client._id, role: client.role, phone: client.phone }, process.env.CLIENT_JWT_SECRET, { expiresIn: '10d' });

        return successResponse(res, 200, "Client Logged in successfully", { client, clientToken });



    } catch (error) {
        errorResponse(res, 500, "Something went wrong", error);
    }
};

const allClientByRepresentative = async (req, res) => {
    try {
        const id = req.headers.repId;
        const filter = {
            representativeId: new mongoose.Types.ObjectId(id),
        };

        const clients = await clientModel.find(filter).sort({ createdAt: -1 });
        if (!clients) return errorResponse(res, 404, "Clients not found", null);
        return successResponse(res, 200, "All clients fetched successfully", clients);

    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error);
    }
};

const clientDeleteByAdmin = async (req, res) => {
    try {
        const id = req.params.id;
        const filter = {
            _id: id
        };
        const client = await clientModel.findByIdAndDelete(filter);
        if (!client) return errorResponse(res, 404, "Client not found", null);
        return successResponse(res, 200, "Client deleted successfully", client);
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error);
    }
};

const clientUpdateByAdmin = async (req, res) => {
    try {
        const id = req.params.id;
        const filter = {
            _id: id
        };
        const { name, phone, address, clientImage, businessType } = req.body;
        const update = {
            name,
            phone,
            address,
            clientImage,
            businessType,
        }
        const client = await clientModel.findOneAndUpdate(filter, update, { new: true });
        if (!client) return errorResponse(res, 404, "Client not found", null);
        return successResponse(res, 200, "Client updated successfully", client);
    } catch (e) {
        return errorResponse(res, 500, "Something went wrong", e);
    }
};


const getAllClientbyRepresentativeId = async (req, res) => {
    const id = req.params.id;

    try {
        const filter = {
            representativeId: id
        };

        const clientOfRepresentative = await clientModel.find(filter);

        if (!clientOfRepresentative) {
            return errorResponse(res, 404, "Clients not found", null);
        }

        return successResponse(res, 200, "Client fetched successfully", clientOfRepresentative);

    } catch (err) {
        return errorResponse(res, 500, "Something went wrong", err);
    }

}




module.exports = {
    createClient,
    clientRoleUpdate,
    clientLogin,
    allClientByRepresentative,
    allClientAdmin,
    clientByIdAdmin,
    clientCreateByAdmin,
    clientDeleteByAdmin,
    clientUpdateByAdmin,
    getAllClientbyRepresentativeId
}