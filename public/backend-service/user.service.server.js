/**
 * Created by xuanyuli on 6/23/17.
 */
var app = require('../../express');
var userModel = require('../model/user.model.server');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL

};

passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
passport.use(new GoogleStrategy(googleConfig, googleStrategy));
app.get('/api/user/:userId', findUserById);
app.get('/api/user/findUserByCredentials', findUserByCredentials);
app.get('/api/username',findUserByUsername);
app.post('/api/user/create', createUser);
app.delete('/api/user/delete/:userId', deleteUser);
app.put('/api/user/update/:userId',updateUser);
app.put('/api/user/follow/:userId', follow);
app.put('/api/user/unfollow/:userId', unfollow);
app.put('/api/user/block/:userId', block);
app.put('/api/user/unblock/:userId', unblock);
// app.get('/api/userIsFollow/:userId',isFollow);
// app.get('/api/userIsBlock/:userId',isBlock);

app.post('/api/login', passport.authenticate('local'), login);
app.get('/api/checkLoggedIn', checkLoggedIn);
app.post('/api/logout',logout);
app.post('/api/register',register);

app.post('/api/userlist',findByListId);



// app.get('/api/userfollowlist/:userId', findUserFollowList);
// app.get('/api/userfollowedlist/:userId', findUserFollowedList);
// app.get('/api/userblocklist/:uesrId', findUserBlockList);
// app.get('/api/useritemlist/:userId', findUserItemList);
// app.get('/api/userorderlist/:userId',findUserOrderList);
// app.get('/api/usercartlist/:userId',findUserCartList);
app.put('/api/useraddcart/:userId',addCart);
app.put('/api/userremovecart/:userId', removeCart);
app.put('/api/checkout/:userId',checkOut);
app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/#!/user/profile',
        failureRedirect: '/#!/login'
    }));

app.put('/api/userci/:userId',createItem);
app.put('/api/userdi/:userId',deleteItem);

function createItem(req, res) {
    var userId = req.params['userId'];
    var item = req.body;
    userModel
        .createItem(userId, item)
        .then(function (status){
            res.sendStatus(200);
        })
}

function deleteItem(req, res){
    var userId = req.params['userId'];
    var item = req.body;
    userModel
        .deleteItem(userId, item)
        .then(function (status){
            res.sendStatus(200);
        })
}
function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
            if(user){
                done(null, user);
            }else {
                done(null, false);
            }
        }, function(error){
            done(error, false);
        })
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

function findUserByUsername(req, res) {
    var username = req.query['username'];
    userModel
        .findUserByUsername(username)
        .then(function(user){
            res.json(user);
        })

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
    var followId = req.body.followId;
    userModel
        .follow(userId,followId)
        .then(function (status){
            res.sendStatus(200);
        });
}

function unfollow(req, res){
    var userId = req. params['userId'];
    var unfollowId = req.body.unfollowId;
    userModel
        .unfollow(userId,unfollowId)
        .then(function (status){
            res.sendStatus(200);
        });
}

function block(req, res){
    var userId = req. params['userId'];
    var blockId = req.body.blockId;
    userModel
        .block(userId,blockId)
        .then(function (status){
            res.sendStatus(200);
        });
}

function unblock(req, res){
    var userId = req. params['userId'];
    var unblockId = req.body.unblockId;
    userModel
        .unblock(userId,unblockId)
        .then(function (status){
            res.sendStatus(200);
        });
}

// function isFollow(req, res){
//     var userId = req. params['userId'];
//     var checkId = req.body;
//     userModel
//         .isFollow(userId,checkId)
//         .then(function (result){
//             res.send(result);
//         })
// }
// function isBlock(req, res){
//     var userId = req. params['userId'];
//     var checkId = req.body;
//     userModel
//         .isBlock(userId,checkId)
//         .then(function (result){
//             res.send(result);
//         })
// }

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
            req
                .login(user, function (status) {
                    res.send(status);
                })
        })

}


// function findUserFollowList(req, res){
//     var userId = req. params['userId'];
//     userModel
//         .findUserFollowList(userId)
//         .then(function (result){
//             res.json(result);
//         })
// }
//
// function findUserFollowedList(req, res){
//     var userId = req. params['userId'];
//     userModel
//         .findUserFollowedList(userId)
//         .then(function (result){
//             res.json(result);
//         })
// }
//
// function findUserBlockList(req, res){
//     var userId = req. params['userId'];
//     userModel
//         .findUserBlockList(userId)
//         .then(function (result){
//             res.json(result);
//         })
// }
//
// function findUserItemList(req, res){
//     var userId = req. params['userId'];
//     userModel
//         .findUserItemList(userId)
//         .then(function (result){
//             res.json(result);
//         })
// }
// function findUserOrderList(req, res){
//     var userId = req. params['userId'];
//     userModel
//         .findUserOrderList(userId)
//         .then(function (result){
//             res.json(result);
//         })
// }
// function findUserCartList(req, res){
//     var userId = req. params['userId'];
//     userModel
//         .findUserCartList(userId)
//         .then(function (result){
//             res.json(result);
//         })
// }

function addCart(req, res){
    var userId = req. params['userId'];
    var item = req.body;
    userModel
        .addCart(userId, item._id)
        .then(function (status){
            res.sendStatus(200);
        })
}

function removeCart(req, res){
    var userId = req. params['userId'];
    var item = req.body;
    userModel
        .removeCart(userId, item._id)
        .then(function (status){
            res.sendStatus(200);
        })
}

function checkOut(req, res){
    var userId = req.params['userId'];
    userModel
        .checkOut(userId)
        .then(function (status){
            res.sendStatus(200);
        })
}

function findByListId(req, res){
    var list = req.body.list;
    userModel
        .findByListId(list)
        .then(function (results){
            res.json(results);
        })
}

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}
