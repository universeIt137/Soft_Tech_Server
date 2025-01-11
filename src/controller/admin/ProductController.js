const { default: mongoose } = require('mongoose');
const ProductModel = require('../../models/ProductModel'); // Adjust the path as necessary
const productCategoryModel = require('../../models/productCategoryModel');
const { successResponse, errorResponse } = require('../../utility/response');

// Create Product
exports.CreateProduct = async (req, res) => {
    try {
        const reqBody = req.body;
        const result = await ProductModel.create(reqBody);
        return res.status(201).json({
            status: "success",
            msg: "Product create successfully",
            data: result
        });
    } catch (e) {
        res.status(500).json({
            status: 'fail',
            msg: e.message
        });
    }
};

// Read Products
exports.GetProducts = async (req, res) => {
    try {
        // join with category id
        const joinWithCategoryId = {
            $lookup: {
                from: "categories",
                localField: "category_name",
                foreignField: "_id",
                as: "category"
            }
        };
        //unwind category
        const unwindCategory = {
            $unwind: {
                path: "$category",
            }
        };
        const products = await ProductModel.aggregate([
            joinWithCategoryId,
            unwindCategory
        ]);
        res.status(200).json({
            status: 'success',
            msg: "Get all product successfully",
            data: products
        });
    } catch (e) {
        res.status(400).json({ status: 'failed', error: e.message });
    }
};

// Update Product
exports.UpdateProduct = async (req, res) => {
    try {
        const id = new mongoose.Types.ObjectId(req.params.id);
        console.log(id);
        const reqBody = req.body;
        let filter = { _id: id };
        let update = reqBody;
        let data = await ProductModel.findById({ _id: id });

        if (!data) return res.status(404).json({
            status: "fail",
            msg: "Product not found"
        })

        const result = await ProductModel.findByIdAndUpdate(filter, update, { new: true });
        res.status(200).json({
            status: 'success',
            msg: "Product update successfully",
            data: result,
        });

    } catch (e) {
        console.log(e);
        res.status(400).json({ status: 'fail', error: e.message });
    }
};

// Delete Product
exports.DeleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await ProductModel.findByIdAndDelete({ _id: id });
        if (result) {
            res.status(200).json({
                status: 'success',
                message: 'Product deleted successfully'
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'Product not found'
            });
        }
    } catch (e) {
        res.status(500).json({
            status: 'fail',
            error: e.message
        });
    }
};


exports.singleProductById = async (req, res) => {
    try {
        let id = new mongoose.Types.ObjectId(req.params.id);
        const matchStage = { $match: { _id: id } };

        // join with category id
        const joinWithCategoryId = {
            $lookup: {
                from: "categories",
                localField: "category_name",
                foreignField: "_id",
                as: "category"
            }
        };

        // unwind category
        const unwindCategory = {
            $unwind: {
                path: "$category",
                preserveNullAndEmptyArrays: true // Optional: to keep the product even if no category found
            }
        };

        const data = await ProductModel.aggregate([
            matchStage,
            joinWithCategoryId,
            unwindCategory
        ]);

        if (data.length === 0) {
            return res.status(404).json({
                status: "fail",
                msg: "Product not found"
            });
        }

        // Since data is an array, we take the first element
        return res.status(200).json({
            status: "success",
            msg: "Product found by id",
            data: data[0] // Return the first object
        });
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            msg: error.toString()
        });
    }
};


exports.createProductCategory = async (req, res) => {
    try {
        let reqBody = req.body;
        let data = await productCategoryModel.create(reqBody);
        return successResponse(res, 201, "Product category created", data);
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error)
    }
};

exports.allProductCategory = async (req, res) => {
    try {
        let data = await productCategoryModel.find().sort({ createdAt: -1 });
        return successResponse(res, 200, "Fetch all data successfully", data);
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error);
    }
};


exports.singleProductCategory = async (req, res) => {
    try {
        let id = req.params.id;
        const filter = {
            _id: id
        };
        const data = await productCategoryModel.findById(filter);
        if (!data) {
            return errorResponse(res, 404, "Data not found", null);
        }
        return successResponse(res, 200, "Fetch single product", data);
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error)
    }
}



exports.productCategoryUpdate = async (req, res) => {
    try {
        let id = req.params.id;
        const filter = {
            _id: id
        };
        const data = await productCategoryModel.findById(filter);
        if (!data) {
            return errorResponse(res, 404, "Data not found", null);
        }
        const reqBody = req.body;
        let updateData = await productCategoryModel.updateOne(filter, reqBody, { new: true })
        return successResponse(res, 200, "Fetch single product", updateData);
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error)
    }
}

