/**
 * Created by xuanyuli on 6/22/17.
 */
var mongoose = require('mongoose');
var orderSchema = require('./order.schema.server');
var orderModel = mongoose.model('orderModel', orderSchema);

orderModel.createOrder = createOrder;
orderModel.findOrderById = findOrderById;
orderModel.findOrderBySellerId = findOrderBySellerId;
orderModel.findOrderByBuyerId = findOrderByBuyerId;
orderModel.findAll = findAll;
orderModel.sendOut = sendOut;
orderModel.delivery = delivery;
orderModel.findByListId = findByListId;

module.exports = orderModel;

function createOrder(order){
    return orderModel.create(order);
}

function findOrderById(orderId){
    return orderModel.findById(orderId);
}

function findOrderBySellerId(sellerId){
    return orderModel.find({sellerId: sellerId})
}

function findOrderByBuyerId(buyerId){
    return orderModel.find({buyerId: buyerId})
}

function findAll(){
    return orderModel.find({});
}

function sendOut(orderId){
    return orderModel.update({_id:orderId},{sendDate:Date.now})
}

function delivery(orderId){
    return orderModel.update({_id:orderId},{deliveryDate:Date.now})
}

function findByListId(list){
    return orderModel.find({_id :{$in:list}})
}