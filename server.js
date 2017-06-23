var express = require('express');
var app = express();
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
mongoose.Promise = require('q').Promise;

require('./public/model/aa.model');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

var connectionString = 'mongodb://127.0.0.1:27017/lc-project'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds143340.mlab.com:43340/heroku_vqfxvvh9'; // user yours
}


mongoose.connect(connectionString);



app.listen(port);
