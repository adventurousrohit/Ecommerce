const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
name:{
    type: String,
    required:true,
    trim:true},

slug:{
    type: String,
    required:true,
    unique:true
},
price:{
    type:String,
    required:true
},
quantity:{
    type:Number,
    required:true,
    default:1

},
description:{
    type:String,
    required:true,
    trim:true
},
offer:{type:Number},
productPic:[
    {img:{type:String}}
],
reviews:[{
    type:mongoose.Schema.Types.ObjectId, ref:'User',
    type:String
}],
category:{type: mongoose.Schema.Types.ObjectId, ref:'category',required:true},
createdBy:{type: mongoose.Schema.Types.ObjectId, ref:'User',required:true}
},{timestamps:true})

module.exports = new mongoose.model('Product',productSchema)