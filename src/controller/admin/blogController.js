const blogModel = require("../../models/blogModel");

class BlogController {
    // Create a new blog post
    async blogCreate(req, res) {
        try {
            const reqBody = req.body;
            const data = await blogModel.create(reqBody);

            return res.status(201).json({
                status: "success",
                msg: "Blog created successfully",
                data: data,
            });
        } catch (error) {
            return res.status(500).json({
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
                id,
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
            return res.status(500).json({
                status: "fail",
                msg: error.toString(),
            });
        }
    }

    // Delete a blog post by ID
    async blogDelete(req, res) {
        try {
            const id = req.params.id;
            const data = await blogModel.findByIdAndDelete(id);

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
            return res.status(500).json({
                status: "fail",
                msg: error.toString(),
            });
        }
    }

    // Get a single blog post by ID
    async singleBlog(req, res) {
        try {
            const id = req.params.id;
            const data = await blogModel.findById(id);

            if (!data) {
                return res.status(404).json({
                    status: "fail",
                    msg: "Blog not found",
                });
            }

            return res.status(200).json({
                status: "success",
                msg: "Blog found by ID",
                data: data,
            });
        } catch (error) {
            return res.status(500).json({
                status: "fail",
                msg: error.toString(),
            });
        }
    }

    // Get all blog posts
    async allBlog(req, res) {
        try {
            const data = await blogModel.find();

            if (data.length === 0) {
                return res.status(404).json({
                    status: "fail",
                    msg: "Blogs not found",
                });
            }

            return res.status(200).json({
                status: "success",
                msg: "All blog posts",
                data: data,
            });
        } catch (error) {
            return res.status(500).json({
                status: "fail",
                msg: error.toString(),
            });
        }
    }
}

// Instantiate the BlogController class
const blogController = new BlogController();

module.exports = blogController;
