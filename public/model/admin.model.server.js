/**
 * Created by xuanyuli on 6/22/17.
 */
var bcrypt = require('bcrypt-nodejs')
var adminSchema = require('./admin.schema.server');
var mongoose = require('mongoose');
var adminModel = mongoose.model('adminModel',adminSchema);


adminModel.findAdminByCredentials = findAdminByCredentials;
adminModel.createAdmin = createAdmin;
adminModel.findAdminById = findAdminById;

module.exports = adminModel;

function findAdminById(adminId){
    return adminModel.findById(adminId)
}

function findAdminByCredentials(username, password){
    return adminModel
        .findOne({username:username})
        .then(function(admin){
            if(admin && bcrypt.compareSync(password, admin.password)){
                return admin;
            } else {
                return null;
            }
        });
}

function createAdmin(admin){
    admin.password = bcrypt.hashSync(admin.password)
    return adminModel.create(admin)
}

