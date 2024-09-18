const ProductModel = require('../../models/ProductModel'); // Adjust the path as necessary

// Create Product
exports.CreateProduct = async (req, res) => {
    try {
        const reqBody = req.body;
        const result = await ProductModel.create(reqBody);
        return res.status(201).json({
            status:"success",
            msg : "Product create successfully",
            data : result
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
        const products = await ProductModel.find();
        res.status(200).json({
            status: 'success',
            msg : "Get all product successfully",
            data: products
        });
    } catch (e) {
        res.status(400).json({status: 'failed', error: e.message});
    }
};

// Update Product
exports.UpdateProduct = async (req, res) => {
    try {
        const  id  = req.params.id;
        const reqBody = req.body;
        let filter = {_id : id};
        let update = reqBody;
        let data = await ProductModel.findById({_id : id});

        if(!data) return res.status(404).json({
            status:"fail",
            msg : "Product not found"
        })

        const result = await ProductModel.findByIdAndUpdate(filter,update,{new:true});
            res.status(200).json({
                status: 'success',
                msg : "Product update successfully",
                data: result,
            });

    } catch (e) {
        res.status(400).json({status: 'fail', error: e.message});
    }
};

// Delete Product
exports.DeleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await ProductModel.findByIdAndDelete({_id : id });
        if(result) {
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


exports.singleProductById = async (req,res)=>{
    try {
        let id = req.params.id;
        let data = await ProductModel.findById({_id : id});
        if(!data)return res.status(404).json({
            status:"fail",
            msg : "Product not found"
        });
        return res.status(200).json({
            status:"success",
            msg : "Product find by id",
            data : data
        });
    } catch (error) {
        return res.status(500).json({
            status:"fail",
            msg : error.toString()
        });
    }
}