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

};

exports.categoryUpdate = async (req, res) => {
    try {
        const id = req.params.id;
        const reqBody = req.body;
        const filter = { _id: id };
        const result = await categoryModel.findOneAndUpdate(filter, reqBody, { new: true });
        if (!result)
            return res.status(404).json({
                status: "fail",
                msg: "Category not found"
            });
        return res.status(200).json({
            status: "success",
            msg: "Category updated successfully",
            data: result
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "failed",
            msg: "Failed to update category"
        });
    }
};

