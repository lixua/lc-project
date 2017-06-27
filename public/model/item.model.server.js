/**
 * Created by xuanyuli on 6/22/17.
 */
var mongoose = require('mongoose');
var itemSchema = require('./item.schema.server');
var itemModel = mongoose.model('itemModel', itemSchema);

itemModel.createItem = createItem;
itemModel.findItemById = findItemById;
itemModel.findItems = findItems;
itemModel.updateItem = updateItem;
itemModel.deleteItem = deleteItem;
itemModel.findAll = findAll;
itemModel.checkOut = checkOut;
itemModel.findByListId = findByListId;

module.exports = itemModel;

function createItem(item){
    return itemModel.create(item);
}

function findItemById(itemId){
    return itemModel.findById(itemId);
}

function findItems(input){
    var typeArray = ['HOME',"ELECTRONICS","MEDIA",'FOOD','SPORT','OTHER'];
    if(typeArray.indexOf(input.toUpperCase()) !== -1){
        return itemModel.find({category:input.toUpperCase()});
    } else {
        return itemModel.find({name: new RegExp('^' + input + '$', "i")}, function(err, doc){
            return doc;
        })
    }
}

function updateItem(itemId, item){
    return itemModel.update({_id: itemId},{$set: item});
}

function deleteItem(itemId){
    return itemModel.update({_id:itemId},{count: 0});
}

function findAll(){
    return itemModel.find({});
}

function checkOut(itemId, number){
    return itemModel.findById(itemId)
        .then(function(get){
            var count = get.count;
            return itemModel.update({_id:itemId},{count:count-number})
        });

}

function findByListId(list){
    return itemModel.find({_id :{$in:list}})
}