const mongoose = require('mongoose')

const DataSchema = mongoose.Schema({
    

}, {timestamps: true,versionKey:false})

const ProductModel = mongoose.model('otps', DataSchema)
module.exports = ProductModel