/**
 * Created by xuanyuli on 6/22/17.
 */
var bcrypt = require('bcrypt-nodejs')
var adminSchema = require('./admin.schema.server');
var mongoose = require('mongoose');
var adminModel = mongoose.model('adminModel',adminSchema);


adminModel.findAdminByCredentials = findAdminByCredentials;
adminModel.createAdmin = createAdmin;
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
        });
}

function createAdmin(admin){
    admin.password = bcrypt.hashSync(admin.password)
    return adminModel.create(admin)
}

var admin = {
    username: "admin",
    password: "admin"
}
createAdmin(admin)
