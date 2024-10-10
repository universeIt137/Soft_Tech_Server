const teamModel = require("../../models/TeamModel");

class teamClass {
    
    createMember = async (req, res) => {
        try {
            let reqBody = req.body;
            let data = await teamModel.create(reqBody);
            return res.status(201).json({
                status: "success",
                msg: "member create successfully",
                data: data,
            });
        } catch (error) {
            return res.status(500).json({
                status: "fail",
                msg: error.toString(),
            });
        }
    };

    getAllMember = async (req, res) => {
        try {
            let data = await teamModel.find();
            if (data.length === 0) {
                return res.status(404).json({
                    status: "fail",
                    msg: "members not found",
                });
            }

            return res.status(200).json({
                status: "success",
                msg: "all member",
                data: data,
            });

        } catch (error) {
            return res.status(500).json({
                status: "fail",
                msg: error.toString(),
            });
        }
    };

    singleMember = async (req, res) => {
        try {
            let id = req.params.id;
            let data = await teamModel.findById({ _id: id });
            if (!data) {
                return res.status(404).json({
                    status: "fail",
                    msg: "member not found"
                });
            }

            return res.status(200).json({
                status: "success",
                msg: "Member found by id",
                data: data
            });
        } catch (error) {
            return res.status(500).json({
                status: "fail",
                msg: error.toString()
            });
        }
    }


    updateMember = async (req, res) => {
        try {
            const id = req.params.id;
            const reqBody = req.body;
            // console.log(reqBody);
            let filter = { _id: id };
            let update = reqBody;
            let data = await teamModel.findById({ _id: id });
            if (!data) return res.status(404).json({
                status: "fail",
                msg: "member not found"
            })

            const result = await teamModel.findByIdAndUpdate(filter, update, { new: true });
            res.status(200).json({
                status: 'success',
                msg: "Member update successfully",
                data: result,
            });

        } catch (error) {
            res.status(400).json({ status: 'fail', error: e.message });
        }
    }

    deleteMember = async (req, res) => {
        try {
            const id = req.params.id;
            const result = await teamModel.findByIdAndDelete({ _id: id });
            if (result) {
                res.status(200).json({
                    status: 'success',
                    message: 'Member deleted successfully'
                });
            } else {
                res.status(404).json({
                    status: 'fail',
                    message: 'Member not found'
                });
            }
        } catch (error) {
            res.status(500).json({
                status: 'fail',
                error: error.message
            })
        }
    };

}

const teamController = new teamClass();
module.exports = teamController;