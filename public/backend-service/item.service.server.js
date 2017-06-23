/**
 * Created by xuanyuli on 6/23/17.
 */
var app = require('../../express');
var itemModel = require('../model/item.model.server');

app.post('/api/item/create', createItem);
app.get('/api/item/:itemId',findItemById);
app.get('/api/item', findItems);
app.put('/api/item/:itemId', updateItem);
app.delete('/api/item/:itemId', deleteItem);

function createItem(req, res){
    var item = req.body;
    itemModel
        .createItem(item)
        .then(function (item){
            res.json(item);
        })
}

function findItemById(req, res){
    var itemId = req.params['itemId'];
    itemModel
        .findItemById(itemId)
        .then(function (item){
            res.json(item);
        })
}

function findItems(req, res){
    var input = req.query['input'];
    itemModel
        .findItems(input)
        .then(function(items){
            res.json(items)
        })
}

function updateItem(req, res){
    var itemId = req.params['itemId'];
    var item = req.body;
    itemModel
        .updateItem(itemId, item)
        .then(function(status){
            res.sendStatus(200);
        })
}

function deleteItem(req, res){
    var itemId = req.params['itemId'];
    itemModel
        .deleteItem(itemId)
        .then(function(status){
            res.sendStatus(200);
        })
}