/**
 * Created by xuanyuli on 6/22/17.
 */
var bcrypt = require("bcrypt-nodejs");
var adminSchema = require('./admin.schema.server');
var mongoose = require('mongoose');
var adminModel = mongoose.model('adminModel',adminSchema);


adminModel.findAdminByCredentials = findAdminByCredentials;

module.exports = adminModel;

function findAdminByCredentials(username, password){
    return adminModel
        .findOne({username:username})
        .then(function(admin){
            if(admin && bcrypt.compareSync(password, admin.password)){
                return admin;
            } else {
                return null;
            }
        })
}

