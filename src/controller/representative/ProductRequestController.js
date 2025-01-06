const { default: mongoose } = require("mongoose");
const clientModel = require("../../models/clientModel");
const productRequestModel = require("../../models/representativeRelatedModels/ProductReqModel");
const { successResponse, errorResponse } = require("../../utility/response");
const clientProductModel = require("../../models/clientProductModel");

exports.MakeProductRequest = async (req, res) => {
  const id = req.headers.repId;
  const repId = new mongoose.Types.ObjectId(id);
  try {
    const reqBody = {
      ...req.body, // Spread existing body fields
      representative_id: repId, // Add or override representative_id
    };
    const data = await productRequestModel.create(reqBody);
    return successResponse(res, 201, "Request Made successful", data);
  } catch (error) {
    return errorResponse(res, 500, "Something went wrong", error);
  }
};

exports.GetAllRequestInfo = async (req, res) => {
  try {
    const id = req.headers.repId;
    const filter = {
      representative_id: new mongoose.Types.ObjectId(id),
    };
    const allRequests = await productRequestModel
      .find(filter)
      .populate("client_id") // Fetch name and email from the Client collection
      .populate("product_id") // Fetch name and price from the Product collection
      .populate("representative_id") // Fetch name and email from the Representative collection
      .sort({ createdAt: -1 });

    return successResponse(res, 200, "All data fetched", allRequests);
  } catch (error) {
    return errorResponse(res, 500, "Something went wrong", error);
  }
};

exports.SellingProdutByRep = async (req, res) => {
  try {
    const id = req.params.id;
    const filter = {
      representative_id: new mongoose.Types.ObjectId(id),
    };
    const allRequests = await productRequestModel
      .find(filter)
      .populate("client_id") // Fetch name and email from the Client collection
      .populate("product_id") // Fetch name and price from the Product collection
      .populate("representative_id") // Fetch name and email from the Representative collection
      .sort({ createdAt: -1 });

    return successResponse(res, 200, "All data fetched", allRequests);
  } catch (error) {
    return errorResponse(res, 500, "Something went wrong", error);
  }
};

exports.GetAllRequestInfoByAdmin = async (req, res) => {
  try {
    const allRequests = await productRequestModel
      .find()
      .populate("client_id") // Fetch name and email from the Client collection
      .populate("product_id") // Fetch name and price from the Product collection
      .populate("representative_id") // Fetch name and email from the Representative collection
      .sort({ createdAt: -1 });

    return successResponse(res, 200, "All data fetched", allRequests);
  } catch (error) {
    return errorResponse(res, 500, "Something went wrong", error);
  }
};

exports.GetSingleRequestInfoByClient = async (req, res) => {
  try {
    const id = req.params.id;
    const allRequests = await productRequestModel
      .findById(id)
      .populate("client_id") // Fetch name and email from the Client collection
      .populate("product_id") // Fetch name and price from the Product collection
      .populate("representative_id") // Fetch name and email from the Representative collection
      .sort({ createdAt: -1 });

    return successResponse(res, 200, "All data fetched", allRequests);
  } catch (error) {
    return errorResponse(res, 500, "Something went wrong", error);
  }
};

exports.GetAllProductRequestForClient = async (req, res) => {
  const clientId = req.headers.clientId; // Extract clientId from headers

  try {
    // Validate input
    if (!clientId) {
      return errorResponse(res, 400, "Missing required field: clientId");
    }

    // Fetch all requests for the given clientId
    const clientRequests = await productRequestModel
      .find({ client_id: clientId }) // Filter by client_id
      .populate("client_id") // Fetch name and email from the Client collection
      .populate("product_id") // Fetch name and price from the Product collection
      .populate("representative_id") // Fetch name and email from the Representative collection
      .sort({ createdAt: -1 });

    // Check if any requests exist
    if (!clientRequests || clientRequests.length === 0) {
      return successResponse(res, 200, "No requests found for this client", []);
    }

    return successResponse(
      res,
      200,
      "Requests fetched successfully",
      clientRequests
    );
  } catch (error) {
    console.error("Error fetching client requests:", error); // Log the error for debugging
    return errorResponse(res, 500, "Something went wrong", error.message);
  }
};

exports.UpdateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params; // Extract the ID from request parameters

    // Validate input
    if (!id) {
      return errorResponse(res, 400, "Missing required field: id");
    }

    // Find the current request document
    const existingRequest = await productRequestModel.findById(id);

    if (!existingRequest) {
      return errorResponse(res, 404, "Request not found");
    }

    // Toggle the status
    const newStatus = !existingRequest.status;

    // Update the status in the database
    const updatedRequest = await productRequestModel.findByIdAndUpdate(
      id,
      { status: newStatus },
      { new: true } // Return the updated document
    );

    return successResponse(
      res,
      200,
      "Status toggled successfully",
      updatedRequest
    );
  } catch (error) {
    console.error("Error toggling status:", error); // Log the error for debugging
    return errorResponse(res, 500, "Something went wrong", error.message);
  }
};






exports.ProductPurchaseRequest = async (req, res) => {
  const id = req.headers.repId;
  const repId = new mongoose.Types.ObjectId(id);
  try {
    const reqBody = {
      ...req.body, // Spread existing body fields
      representative_id: repId, // Add or override representative_id
    };
    const data = await clientProductModel.create(reqBody);
    return successResponse(res, 201, "Request Made successful", data);
  } catch (error) {
    return errorResponse(res, 500, "Something went wrong", error);
  }
};

exports.GetAllPurchaseRequestInfoByRepresentative = async (req, res) => {
  try {
    const id = req.headers.repId;
    const filter = {
      representative_id: new mongoose.Types.ObjectId(id),
    };
    const allRequests = await clientProductModel
      .find(filter)
      .populate("client_id") // Fetch name and email from the Client collection
      .populate("productCategory") // Fetch name and price from the Product collection
      .populate("representative_id") // Fetch name and email from the Representative collection
      .sort({ createdAt: -1 });

    return successResponse(res, 200, "All data fetched", allRequests);
  } catch (error) {
    console.log(error)
    return errorResponse(res, 500, "Something went wrong", error);
  }
};

exports.GetAllPurchaseRequestInfoByAdmin = async (req, res) => {
    try {
      const allRequests = await clientProductModel
        .find()
        .populate("client_id") // Fetch name and email from the Client collection
        .populate("productCategory") // Fetch name and price from the Product collection
        .populate("representative_id") // Fetch name and email from the Representative collection
        .sort({ createdAt: -1 });
  
      return successResponse(res, 200, "All data fetched", allRequests);
    } catch (error) {
      return errorResponse(res, 500, "Something went wrong", error);
    }
};

exports.GetSingleProductRequestInfo = async (req, res) => {
    try {
      const id = req.params.id;
      const allRequests = await clientProductModel
        .findById(id)
        .populate("client_id") // Fetch name and email from the Client collection
        .populate("productCategory") // Fetch name and price from the Product collection
        .populate("representative_id") // Fetch name and email from the Representative collection
        .sort({ createdAt: -1 });
  
      return successResponse(res, 200, "All data fetched", allRequests);
    } catch (error) {
      return errorResponse(res, 500, "Something went wrong", error);
    }
};