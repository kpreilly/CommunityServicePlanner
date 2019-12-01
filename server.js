var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
app.use(bodyParser.json());
var userData = require('./users.json');

app.post('/login', function(req,res,next){
    // Get usename and password from request body    
    var username = req.body.username;
    var password = req.body.password
    // Verify credentials
    var loginSuccessful = false;
    userData.users.forEach(user => {
        if (user["username"] === username && user["password"] === password ) {
            user["loggedin"] = 1;
            loginSuccessful = true;
        }
    });
    // If logged in, update json file
    if (loginSuccessful) {
        fs.writeFile('users.json', JSON.stringify(userData), (error, result)=>{
            if(!error){
                res.status(200).send(username + " logged in");
            }
            else{
                res.status(400).send("Error logging in " + username);
            }
        }); 
    } else {
        res.status(401).send("Invalid username and/or password");
    }
});

app.post('/register', (req, res) => {
    let obj = {};
    obj.username = req.body.username;
    obj.email = req.body.email;
    obj.password = req.body.password;
    obj.loggedin = 0;

    let usernameExists = false;
    let emailExists = false;
    userData.users.forEach(user => {
        if (user["username"] === obj["username"]) {
            usernameExists = true;
        }
        if (user["email"] === obj["email"]) {
            emailExists = true;
        }
    });

    if (!usernameExists && !emailExists) {
        userData.users.push(obj);
        fs.writeFile('users.json', JSON.stringify(userData), (err) => {
            if (err) {
                res.status(400).send("Error registering " + obj.username);
            } else {
                res.status(200).send(obj.username + " has been successfully registered");
            }
        });
    } else {
        res.status(400).send("Username and/or email already exist");
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
