/**
 * Created by xuanyuli on 6/23/17.
 */
var app = require('../../express');
var userModel = require('../model/user.model.server');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.get('/api/user/:userId', findUserById);
app.get('/api/user/findUserByCredentials', findUserByCredentials);
app.post('/api/user/create', createUser);
app.delete('/api/user/delete/:userId', deleteUser);
app.put('/api/user/update/:userId',updateUser);
app.put('/api/user/follow/:userId', follow);
app.put('/api/user/unfollow/:userId', unfollow);
app.put('/api/user/block/:userId', block);
app.put('/api/user/unblock/:userId', unblock);
app.get('/api/userIsFollow/:userId',isFollow);
app.get('/api/userIsBlock/:userId',isBlock);

app.post('/api/login', passport.authenticate('local'), login);
app.get('/api/checkLoggedIn', checkLoggedIn);
app.post('/api/logout',logout);
app.post('/api/register',register);

function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(
            function(user) {
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            },
            function(err) {
                if (err) { return done(err); }
            }
        );
}
function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}
function findUserById(req, res){
    var userId = req.params['userId'];
    userModel
        .findUserById(userId)
        .then(function (user){
            res.json(user);
        })
}
function findUserByCredentials(req, res){
    var username = req.query['username'];
    var password = req.query['password'];

    userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
            if(user !== null) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        }, function (err) {
            res.sendStatus(404);
        });
}
function createUser(req, res){
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        });
}
function deleteUser(req, res){
    var userId = req.params['userId'];
    userModel
        .deleteUser(userId)
        .then(function (status){
            res.sendStatus(200);
        })
}
function updateUser(req, res) {
    var user = req.body;
    var userId = req.params['userId'];
    userModel
        .updateUser(userId, user)
        .then(function (status) {
            res.sendStatus(200);
        });

}

function follow(req, res){
    var userId = req. params['userId'];
    var followId = req.body;
    userModel
        .follow(userId,followId)
        .then(function (status){
            res.sendStatus(200);
        });
}

function unfollow(req, res){
    var userId = req. params['userId'];
    var unfollowId = req.body;
    userModel
        .unfollow(userId,unfollowId)
        .then(function (status){
            res.sendStatus(200);
        });
}

function block(req, res){
    var userId = req. params['userId'];
    var blockId = req.body;
    userModel
        .block(userId,blockId)
        .then(function (status){
            res.sendStatus(200);
        });
}

function unblock(req, res){
    var userId = req. params['userId'];
    var unblockId = req.body;
    userModel
        .unblock(userId,unblockId)
        .then(function (status){
            res.sendStatus(200);
        });
}

function isFollow(req, res){
    var userId = req. params['userId'];
    var checkId = req.body;
    userModel
        .isFollow(userId,checkId)
        .then(function (result){
            res.send(result);
        })
}
function isBlock(req, res){
    var userId = req. params['userId'];
    var checkId = req.body;
    userModel
        .isBlock(userId,checkId)
        .then(function (result){
            res.send(result);
        })
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}
function checkLoggedIn(req, res) {
    if(req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}
function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}
function register(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            req.login(user, function (status) {
                res.json(user);
            });
        });
}
