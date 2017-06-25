/**
 * Created by xuanyuli on 6/22/17.
 */
var mongoose = require('mongoose');
var orderSchema = mongoose.Schema({
    itemId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"itemModel",
        require: true},
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        require: true},
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        require: true},
    createDate: {type:Date,default: Date.now},
    sendDate: Date,
    deliveryDate: Date,
    price: {type:Number, require:true},
    count: {type:Number, require:true}
},{collection:"order"});
module.exports = orderSchema;