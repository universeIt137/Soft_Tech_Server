const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productCategorySchema = new Schema(
  {
    productName: {
      type: String,
    },
    package: [
      {
        totalPage: {
          type: String,
        },
        features: {
          type: String,
        },
        deliveryTime: {
          type: String,
        },
      },
    ],
    price: {
      type: String,
    },
    representativePercentange: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

const productCategoryModel = model("productCategory",productCategorySchema  );


module.exports = productCategoryModel;