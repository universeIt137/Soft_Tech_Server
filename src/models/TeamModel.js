const mongoose = require('mongoose')

const DataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    designation: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true },
    experience: { type: String, required: true },
    image: { type: String, required: true },

},
    {
        timestamps: true, versionKey: false
    }
);

const TeamModel = mongoose.model('teams', DataSchema)
module.exports = TeamModel