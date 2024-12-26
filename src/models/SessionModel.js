const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema(
    {
        session_name: { type: String },
        video_url: { type: String }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const SessionModel = mongoose.model('Session', dataSchema);

module.exports = SessionModel;