const blogModel = require("../../models/blogModel");

class blogClass {
    blogCreate = async (req, res, next) => {
        try {
            let reqBody = req.body;
            let data = await blogModel.create(reqBody);
            return res.status(201).json({
                status: "success",
                msg: "Blog created successfully",
                data: data,
            });
        } catch (error) {
            res.status(500).json({
                status: "fail",
                msg: error.toString(),
            })
        }
    };
}

const blogController = new blogClass();

module.exports = blogController;