var path = require('path');
var express = require('express');

var app = express();

// Serve all resources in public
app.use(express.static('public'));

// Present html 
app.get('/', function(req, res, next){
    res.status(200).sendFile(__dirname + '/public/login.html');
});

// Listen on port 3000
app.listen(3000, function(error){
    if(error){
        throw error;
    }
    console.log("Running");
});