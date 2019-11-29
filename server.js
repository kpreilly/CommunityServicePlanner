var path = require('path');
var express = require('express');

var app = express();

app.get('/', function(req, res, next){
    res.status(200).sendFile(__dirname + '/login.html');
});

app.listen(3000, function(error){
    if(error){
        throw error;
    }
    console.log("Running");
});