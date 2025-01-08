const { default: mongoose } = require("mongoose");
const { Schema } = require("mongoose");

const DataSchema = new Schema(
    {
        client: { type: mongoose.Types.ObjectId, ref: 'clients' },
        product: { type: mongoose.Types.ObjectId, ref: 'productCategory' },
        representative: { type: mongoose.Types.ObjectId, ref: 'representatives' },
        duration: { type: Number },
        transaction_id: { type: String },
        paidAmount: { type: Number },
        dueAmount: { type: Number },
        productName: { type: String },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const paymentModel = mongoose.model('payment', DataSchema);
module.exports = paymentModel;