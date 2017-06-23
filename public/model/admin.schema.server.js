/**
 * Created by xuanyuli on 6/22/17.
 */
var mongoose = require('mongoose');
var adminSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    createDate: {type:Date,default: Date.now},
    rate:{type: Number, default: 0}
},{collection:"adminAccount"});

module.exports = adminSchema;