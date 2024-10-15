const blogModel = require("../../models/blogModel");

class BlogController {
    // Create a new blog post
    async blogCreate(req, res, next) {
        try {
            const reqBody = req.body;
            const data = await blogModel.create(reqBody);

            return res.status(201).json({
                status: "success",
                msg: "Blog created successfully",
                data: data,
            });
        } catch (error) {
            res.status(500).json({
                status: "fail",
                msg: error.toString(),
            });
        }
    }

    // Update an existing blog post by ID
    async blogUpdate(req, res) {
        try {
            const reqBody = req.body;
            const id = req.params.id;

            const data = await blogModel.findByIdAndUpdate(
                { _id: id },
                reqBody,
                { new: true } // Returns the updated document
            );

            if (!data) {
                return res.status(404).json({
                    status: "fail",
                    msg: "Blog not found",
                });
            }

            return res.status(200).json({
                status: "success",
                msg: "Blog updated successfully",
                data: data,
            });
        } catch (error) {
            res.status(500).json({
                status: "fail",
                msg: error.toString(),
            });
        }
    }

    // Delete a blog post by ID
    async blogDelete(req, res) {
        try {
            const id = req.params.id;
            const data = await blogModel.findByIdAndDelete({ _id: id });

            if (!data) {
                return res.status(404).json({
                    status: "fail",
                    msg: "Blog not found",
                });
            }

            return res.status(200).json({
                status: "success",
                msg: "Blog deleted successfully",
            });
        } catch (error) {
            res.status(500).json({
                status: "fail",
                msg: error.toString(),
            });
        }
    }
}

// Instantiate the BlogController class
const blogController = new BlogController();

module.exports = blogController;
