const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const DataSchema = new Schema({
    client_id: { type: mongoose.Types.ObjectId, ref: 'clients' },
    product_id: { type: mongoose.Types.ObjectId, ref: 'products' },
    representative_id: { type: mongoose.Types.ObjectId, ref: 'representatives' },
    month: { type: String },
    status: {
        type: Boolean,
        default: false,
    },
},
    {
        timestamps: true, versionKey: false
    }
);

const productRequestModel = mongoose.model('ProductRequest', DataSchema);

module.exports = productRequestModel;