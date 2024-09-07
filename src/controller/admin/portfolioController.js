const portfolioModel = require("../../models/portfolioModel");


class portfolioClass {

    createPortfolio = async (req,res) =>{
        try {
            let reqBody = req.body;
            let data = await portfolioModel.create(reqBody);
            return res.status(201).json({
                status:"success",
                msg : "portfolio create successfully",
                data : data
            });
        } catch (error) {
            return res.status(500).json({
                status:"fail",
                msg : error.toString()
            });
        }
    };

    deletePortfolio = async (req,res)=>{
        try {
            let id = req.params.id;
            let filter = {_id : id};
            let data = await portfolioModel.findOne({_id :id});
            if(!data) return res.status(404).json({
                status:"fail",
                msg : "portfolio not found "
            });
            await portfolioModel.findByIdAndDelete(filter);
            return res.status(200).json({
                status:"success",
                msg : "portfolio delete successfully"
            });
        } catch (error) {
            return res.status(500).json({
                status:"fail",
                msg : error.toString()
            });
        }
    }
}

const portfolioController = new portfolioClass();

module.exports = portfolioController