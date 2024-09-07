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
}

const portfolioController = new portfolioClass();

module.exports = portfolioController