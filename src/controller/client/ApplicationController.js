const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;
const ApplicationModel = require('../../models/applicationModel')


// apply carrer

exports.applyJob = async (req, res) => {
    try {
        let fullName = req.body.fullName;
        let phoneNumber = req.body.phoneNumber;
        let address = req.body.address;
        let resume =req.file.filename;

        let applicationData = {
            fullName,
            phoneNumber,
            address,
            resume: resume
        };

        let result = await ApplicationModel.create(applicationData);

        res.status(201).json({
            status: 'success',
            msg: "Application submitted successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            msg: error.toString()
        });
    }
};

exports.allApplications = async (req, res) => {
    try {
        let data = await ApplicationModel.find();
        return res.status(200).json({
            status: 'success',
            msg: 'All applications fetched successfully',
            data: data
        })
    } catch (error) {
        
    }
};

exports.deleteApplicationById = async (req, res) => {
    try {
        let id = req.params.id;
        let data = await ApplicationModel.findById({ _id: id });
        if (!data) return res.status(404).send({
            status: 'fail',
            message: 'Application not found'
        });
        await ApplicationModel.findByIdAndDelete({ _id: id });
        res.status(200).json({
            status: 'success',
            message: 'Application deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error.toString()
        });
    }
}




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
        res.status(400).json({ status: 'failed', result: e });
    }
}

exports.updateApplication = async (req, res) => {
    try {
        let applicationId = req.params.id
        let reqBody = req.body

        await ApplicationModel.findOneAndUpdate(
            { _id: applicationId },
            reqBody,
            { new: true }  );

        res.status(200).json({ status: 'Success', data: "Your  application has updated." });
    } catch (e) {
        res.status(400).json({ status: 'failed', result: e.toString() });
    }   
};


exports.getApplicationsByCareer  = async (req, res) => {
    try {
        const careerid = req.params.careerId;
        const applications = await ApplicationModel.find({ carreerID: careerid });

        if (!applications.length) {
            return res.status(404).json({ status: "fail", message: "No applications found for this job" });
        }

        res.status(200).json({ status: "success", data: applications });

    } catch (e) {
        res.status(400).json({ status: 'failed', result: e.toString() });
    }   
};

exports.deleteApplication  = async (req, res) => {
    try {
        const careerid = req.params.id
        const applications = await ApplicationModel.find({ _id: careerid });

        if (!applications.length) {
            return res.status(404).json({ status: "fail", message: "No applications found for this job" });
        }

        res.status(200).json({ status: "success", data: applications });

    } catch (e) {
        res.status(400).json({ status: 'failed', result: e.toString() });
    }   
};

exports.getApplicationByUser = async (req, res) => {
    try{
        const user_id = new ObjectId(req.headers.user_id);
        let MatchStage = {$match: {userID: user_id}}

        let JoinWithUserStage = { $lookup: { from: 'users',localField: 'userID', foreignField: '_id', as: 'user' }};
        
        let UnwindUserStage = {$unwind: '$user'}

        let result = await ApplicationModel.aggregate([
            MatchStage,
            JoinWithUserStage,
            UnwindUserStage

        ])
        res.status(200).json({status: "success", data: result})
    }catch(err){
        res.status(400).json({status:"fail",data:err.toString()})
    }
};