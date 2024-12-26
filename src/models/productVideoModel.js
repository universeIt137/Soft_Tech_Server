const mongoose = require('mongoose');


const {Schema,model} = mongoose;


const productVideoSchema = new Schema({
    videoUrl : {
        type : String,
    },
    youtubeUrl : {
        type : String,
    },
    title : {
        type : String,
    }
    
},{ timestamps : true,versionKey : false });



const productVideoModel = model('productVideos', productVideoSchema);


module.exports = productVideoModel;