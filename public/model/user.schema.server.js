/**
 * Created by xuanyuli on 6/22/17.
 */
var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    dob: Date,
    createDate: {type:Date,default: Date.now},
    role: {type:String, default: 'BUYER',enum:['BUYER','SELLER']},
    followList: {
        type: [mongoose.Schema.Types.ObjectId],
        ref:"userModel"
    },
    followedList:{
        type: [mongoose.Schema.Types.ObjectId],
        ref:"userModel"
    },
    blockList:{
        type: [mongoose.Schema.Types.ObjectId],
        ref:"userModel"
    },
    itemList:{
        type: [mongoose.Schema.Types.ObjectId],
        ref:"itemModel"
    },
    orderList:{
        type: [mongoose.Schema.Types.ObjectId],
        ref:"orderModel"
    },
    cartList:{
        type: [mongoose.Schema.Types.ObjectId],
        ref:"itemModel"
    },
    rate:{type: Number, default: 0}

},{collection:"user"});
module.exports = userSchema;