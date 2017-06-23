/**
 * Created by xuanyuli on 6/22/17.
 */
var bcrypt = require("bcrypt-nodejs");
var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('userModel',userSchema);
userModel.findUserById = findUserById;
userModel.findUserByCredentials = findUserByCredentials;
userModel.createUser = createUser;
userModel.deleteUser = deleteUser;
userModel.updateUser = updateUser;
userModel.follow = follow;
userModel.unfollow = unfollow;
userModel.block = block;
userModel.unblock = unblock;
userModel.isFollow = isFollow;
userModel.isBlock = isBlock;
userModel.findAll = findAll;

module.exports = userModel;

function findUserById(userId){
    return userModel.findById(userId);
}

function findUserByCredentials(username, password){
    return userModel
        .findOne({username: username})
        .then(function (user) {

            if(user && bcrypt.compareSync(password, user.password)) {
                console.log("SUCCESS")
                return user;
            } else {
                console.log("FAIL")
                return null;
            }
        });
}

function createUser(user){
    user.password = bcrypt.hashSync(user.password);
    return userModel.create(user);
}

function deleteUser(userId){
    return userModel.remove({_id: userId});
}

function updateUser(userId, newUser){
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
            if(isFollow(userId,blockId)){
                user.unfollow(userId,blockId);
            }
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

function isFollow(userId, checkId){
    return userModel
        .findById(userId)
        .then(function(user){
            var index = user.followedList.indexOf(checkId);
            return index !== -1;
        })
}

function isBlock(userId, checkId){
    return userModel
        .findById(userId)
        .then(function(user){
            var index = user.blockList.indexOf(checkId);
            return index !== -1;
        })
}

function findAll(){
    return userModel.find({});
}

