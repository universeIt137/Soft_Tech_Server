const { default: mongoose } = require('mongoose');
const ProductModel = require('../../models/ProductModel'); // Adjust the path as necessary

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
        const id = req.params.id;
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
