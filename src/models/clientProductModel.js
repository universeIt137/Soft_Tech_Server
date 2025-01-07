const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const clientProductSchema = new Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "productCategory",
    },
    representative_id: {
      type: mongoose.Types.ObjectId,
      ref: "representatives",
    },
    client_id: { type: mongoose.Types.ObjectId, ref : "clients" },
    productExtraDes: {
      type: String,
    },
    duraction: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
    fixedPrice: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

const clientProductModel = model("Client-ProductList", clientProductSchema);

module.exports = clientProductModel;
