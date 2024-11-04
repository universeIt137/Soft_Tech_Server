const categoryModel = require("../../models/categoryModel");


exports.categoryCreate = async (req, res) => {
    try {
        const reqBody = req.body;
        const result = await categoryModel.create(reqBody);
        return res.status(201).json({
            status: "success",
            msg: "Category created successfully",
            data: result
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "failed",
            msg: "Failed to create category"
        });
    }

}