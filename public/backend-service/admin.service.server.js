/**
 * Created by xuanyuli on 6/23/17.
 */
var app = require('../../express');
var adminModel = require('../model/admin.model.server');
var userModel = require('../model/user.model.server');
var itemModel = require('../model/item.model.server');
var orderModel = require('../model/order.model.server');

app.get('/api/admin/login', findAdminByCredentials);
app.get('/api/admin/allorder',findAllOrder);
app.get('/api/admin/alluser',findAllUser);
app.get('/api/admin/allitem',findAllItem);

function findAdminByCredentials(req, res){
    var username = req.query['username'];
    var password = req.query['password'];

    adminModel
        .findAdminByCredentials(username, password)
        .then(function (admin) {
            if(admin !== null) {
                res.json(admin);
            } else {
                res.sendStatus(404);
            }
        }, function (err) {
            res.sendStatus(404);
        });
}

function findAllOrder(req, res){
    orderModel
        .findAll()
        .then(function(result){
            res.json(result)
        })
}

function findAllUser(req, res){
    userModel
        .findAll()
        .then(function(result){
            res.json(result)
        })
}
function findAllItem(req, res){
    itemModel
        .findAll()
        .then(function(result){
            res.json(result)
        })
}