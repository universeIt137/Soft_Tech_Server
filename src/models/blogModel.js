const mongoose = require('mongoose');

const {Schema,model} = mongoose;


const blogSchema = new Schema({
    blogTitle: { type: String},
    author_name: { type: String,},
    blog_banner_image: { type: String},
    meta_keywords: { type: String},
    blog_description: { type: String},
    
},{timestamps: true,versionKey:false});



const blogModel = model('blogs', blogSchema);

module.exports = blogModel;