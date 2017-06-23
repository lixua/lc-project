/**
 * Created by xuanyuli on 6/22/17.
 */
var mongoose = require('mongoose');
var itemSchema = mongoose.Schema({
    name: {type: String, require: true},
    price: {type: Number, require: true},
    description: String,
    count: {type: Number, require: true},
    category:{type: String, default:'OTHER', enum:['HOME',"ELECTRONICS","MEDIA",'FOOD','SPORT','OTHER']},
    postBy: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel",
        require: true},
    createDate: {type:Date,default: Date.now},
    comments:[String],
    image:{type:String, require:true},
    rate:{type: Number, default: 0}
},{collection:"item"});
module.exports = itemSchema;