/**
 * Created by xuanyuli on 6/22/17.
 */
var bcrypt = require("bcrypt-nodejs");
var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('userModel',userSchema);

userModel.findUserById = findUserById;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByUsername = findUserByUsername;
userModel.createUser = createUser;
userModel.deleteUser = deleteUser;
userModel.updateUser = updateUser;
userModel.follow = follow;
userModel.unfollow = unfollow;
userModel.block = block;
userModel.unblock = unblock;
// userModel.isFollow = isFollow;
// userModel.isBlock = isBlock;
userModel.findAll = findAll;

userModel.addCart = addCart;
userModel.removeCart = removeCart;
userModel.checkOut = checkOut;

userModel.findByListId = findByListId;

userModel.findUserByGoogleId =findUserByGoogleId;

userModel.createItem = createItem;
userModel.deleteItem = deleteItem;


module.exports = userModel;

function createItem(userId, item){
    return userModel
        .findById(userId)
        .then(function (user){
            user.itemList.push(item._id);
            return user.save();
        })
}

function deleteItem(userId, item){
    return userModel
        .findById(userId)
        .then(function (user){
            var index = user.itemList.indexOf(item._id);
            user.itemList.splice(index,1);
            return user.save();
        })
}
function findUserById(userId){
    return userModel.findById(userId);
}

function findUserByCredentials(username, password){
    return userModel
        .findOne({username: username})
        .then(function (user) {
            if(user && bcrypt.compareSync(password, user.password)) {
                return user;
            } else {
                return null;
            }
        });
}

function findUserByUsername(username){
    return userModel.findOne({username:username});
}

function createUser(user){
    user.password = bcrypt.hashSync(user.password);
    return userModel.create(user);
}

function deleteUser(userId){
    return userModel.remove({_id: userId});
}

function updateUser(userId, user){
    return userModel.update({_id: userId},{$set: user});
}

function follow(userId, followId){
    return userModel
        .findById(userId)
        .then(function (user){
            user.followList.push(followId);
            user.save();
            userModel
                .findById(followId)
                .then(function (follow){
                    follow.followedList.push(userId);
                    return follow.save();
                })
        })

}

function unfollow(userId, followId){
    return userModel
        .findById(userId)
        .then(function (user){
            var index = user.followList.indexOf(followId);
            user.followList.splice(index,1);
            user.save();
            userModel
                .findById(followId)
                .then(function (follow){
                    var index2 = follow.followedList.indexOf(userId);
                    follow.followedList.splice(index2,1);
                    return follow.save();
                })
        })
}

function block(userId, blockId){
    return userModel
        .findById(userId)
        .then(function(user){
            user.blockList.push(blockId);
            return user.save();
        })
}

function unblock(userId, blockId){
    return userModel
        .findById(userId)
        .then(function (user){
            var index = user.blockList.indexOf(blockId);
            user.blockList.splice(index,1);
            return user.save();
        })
}

// function isFollow(userId, checkId){
//     return userModel
//         .findById(userId)
//         .then(function(user){
//             var index = user.followedList.indexOf(checkId);
//             return index !== -1;
//         })
// }
//
// function isBlock(userId, checkId){
//     return userModel
//         .findById(userId)
//         .then(function(user){
//             var index = user.blockList.indexOf(checkId);
//             return index !== -1;
//         })
// }

function findAll(){
    return userModel.find({});
}

function addCart(userId, itemId){
    return userModel
        .findById(userId)
        .then(function (user){
            user.cartList.push(itemId);
            return user.save();
        })
}

function removeCart(userId, itemId){
    return userModel
        .findById(userId)
        .then(function (user){
            var index = user.cartList.indexOf(itemId);
            user.cartList.splice(itemId,1);
            return user.save();
        })
}

function checkOut(userId){
    return userModel.update({_id: userId},{cartList:[]});
}

function findByListId(list){
    return userModel.find({_id :{$in:list}})
}
function findUserByGoogleId(Id) {
    return userModel.findOne({'google.id': Id});
}

