const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const ApplicationModel = require('../../models/applicationModel')


// apply carrer

exports.applyJob = async (req, res) => {
    try {
        let reqBody = req.body;
        let careerId = req.params.careerId;
        reqBody.carreerID = careerId;

        let user_id = new ObjectId(req.headers.user_id);
        reqBody.userID = user_id;

        let result = await ApplicationModel.create(reqBody);

        res.status(200).json({ status: 'Your application has been sent', data: result });
    } catch (e) {
        res.status(400).json({ status: 'failed', result: e.toString() });
    }
};

exports.getApplication = async (req, res) => {
    try {

        const joinWithCareerStage = { $lookup: { from: 'careers', localField: 'carreerID', foreignField: '_id', as: 'circular' } };
        const joinWithUserStage = { $lookup: { from: 'users', localField: 'userID', foreignField: '_id', as: 'user' } };

        const UnwindCareerStage = { $unwind: { path: '$circular', preserveNullAndEmptyArrays: true } };
        const UnwindUserStage = { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } };

        const result = await ApplicationModel.aggregate([
           
            joinWithCareerStage,
            joinWithUserStage,
            UnwindCareerStage,
            UnwindUserStage
        ]);

        res.status(200).json({ status: 'Success', data: result });

    } catch (e) {
        console.log(e);
        res.status(400).json({ status: 'failed', result: e });
    }
}

