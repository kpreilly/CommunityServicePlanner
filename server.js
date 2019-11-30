var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
var userData = require('./users.json');

app.post('/login', function(req,res,next){
    // Get usename and password from request body    
    var username = req.body.username;
    var password = req.body.password
    // Verify credentials
    if(userData[username]){
        if(userData[username].password === password){
            res.status(200).send(username + " logged in.");
        }
        // Return password error
        else{
            res.status(401).send(username + ", wrong password.");
        }
    }
    // Else return failure
    else{
        res.status(404).send("User, " + username + ", DNE.");
    }
});

// Present html 
app.get('/', function(req, res, next){
    res.status(200).sendFile(__dirname + '/public/index.html');
});

// Serve all resources in public
app.use(express.static('public'));


// Listen on port 3000
app.listen(3000, function(error){
    if(error){
        throw error;
    }
    console.log("Running");
});