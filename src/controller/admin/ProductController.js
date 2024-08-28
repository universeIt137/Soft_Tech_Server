const ProductModel = require('../../models/ProductModel'); // Adjust the path as necessary

// Create Product
exports.CreateProduct = async (req, res) => {
    try {
        const productData = {
            productName: req.body.productName,
            productImage: req.body.productImage,
            productDesc: req.body.productDesc
        };
        const result = await ProductModel.create(productData);
        res.status(200).json({status: 'success', data: result});
    } catch (e) {
        res.status(400).json({status: 'failed', error: e.message});
    }
};

// Read Products
exports.GetProducts = async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.status(200).json({status: 'success', data: products});
    } catch (e) {
        res.status(400).json({status: 'failed', error: e.message});
    }
};

// Update Product
exports.UpdateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = {
            productName: req.body.productName,
            productImage: req.body.productImage,
            productDesc: req.body.productDesc
        };
        const result = await ProductModel.findByIdAndUpdate(id, updatedData, { new: true });
        if(result) {
            res.status(200).json({status: 'success', data: result});
        } else {
            res.status(404).json({status: 'failed', message: 'Product not found'});
        }
    } catch (e) {
        res.status(400).json({status: 'failed', error: e.message});
    }
};

// Delete Product
exports.DeleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await ProductModel.findByIdAndDelete(id);
        if(rewsult) {
            res.status(200).json({status: 'success', message: 'Product deleted successfully'});
        } else {
            res.status(404).json({status: 'failed', message: 'Product not found'});
        }
    } catch (e) {
        res.status(400).json({status: 'failed', error: e.message});
    }
};
