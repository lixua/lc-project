/**
 * Created by xuanyuli on 6/23/17.
 */
var app = require('../../express');
var orderModel = require('../model/order.model.server');


app.post('/api/order/create', createOrder);
app.get('/api/order/:orderId',findOrderById);
app.get('/api/orderseller/:sellerId', findOrderBySellerId);
app.get('/api/orderbuyer/:buyerId', findOrderByBuyerId);
app.put('/api/ordersend/:orderId',sendOut);
app.put('/api/orderdelivery/:orderId',delivery)

app.post('/api/orderlist',findByListId);

function createOrder(req, res){
    var order = req.body;
    orderModel
        .createOrder(order)
        .then(function (order){
            res.json(order);
        })
}

function findOrderById(req, res){
    var orderId = req.params['orderId'];
    orderModel
        .findOrderById(orderId)
        .then(function (order){
            res.json(order);
        })
}

function findOrderBySellerId(req, res){
    var sellerId = req.params['sellerId'];
    orderModel
        .findOrderBySellerId(sellerId)
        .then(function(orders){
            res.json(orders)
        });
}

function findOrderByBuyerId(req, res){
    var buyerId = req.params['buyerId'];
    orderModel
        .findOrderByBuyerId(buyerId)
        .then(function(orders){
            res.json(orders)
        });
}

function sendOut(req, res){
    var orderId = req.params['orderId'];
    orderModel
        .sendOut(orderId)
        .then(function(status){
            res.sendStatus(200);
        })

}

function delivery(req, res){
    var orderId = req.params['orderId'];
    orderModel
        .delivery(orderId)
        .then(function(status){
            res.sendStatus(200);
        })

}
function findByListId(req, res){
    var list = req.body.list;
    orderModel
        .findByListId(list)
        .then(function (results){
            res.json(results);
        })
}