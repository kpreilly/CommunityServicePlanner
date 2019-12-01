let path = require('path');
let express = require('express');
let bodyParser = require('body-parser');
let fs = require('fs');

let app = express();
app.use(bodyParser.json());
let userData = require('./users.json');

app.post('/login', function(req,res,next){
    // Get usename and password from request body    
    let username = req.body.username;
    let password = req.body.password

    // Verify credentials;
    let loginSuccessful = false;
    if (userData[username] && userData[username].password === password) {
        userData[username].loggedin = 1;
        loginSuccessful = true;
    }

    //If logged in, update json file
    if (loginSuccessful) {
        fs.writeFile('users.json', JSON.stringify(userData), (err, result) => {
            if (!err) {
                res.status(200).send(username + " logged in");
            } else {
                res.status(400).send("Error logging in " + username);
            }
        });
    } else {
        res.status(401).send("Invalid username and/or password");
    }
});

app.post('/logout', (req, res)=>{
    let username = req.body.username;
    let loggedout = 0;
    if(userData[username]){
        userData[username].loggedin = 0;
        loggedout = 1;
    }
    if(loggedout){
        res.status(200).send("Logged out " + username);
    }
    else{
        res.status(400).send("Username not found"); 
    }

});

app.post('/register', (req, res) => {
    // Get usename and password from request body 
    let username = req.body.username;
    let email = req.body.email

    // Verify username and email don't exist
    let usernameExists = false;
    let emailExists = false;
    if (userData[username]) {
        usernameExists = true;
    } else {
        for (const user in userData) {
            if (userData[user].email === email) {
                emailExists = true;
            }
        }
    }

    // If username and email don't exist, add user
    if (!usernameExists && !emailExists) {
        userData[username] = {};
        userData[username].email = email;
        userData[username].password = req.body.password;
        userData[username].loggedin = 0;
        fs.writeFile('users.json', JSON.stringify(userData), (err) => {
            if (err) {
                res.status(400).send("Error registering " + username);
            } else {
                res.status(200).send(username + " has been successfully registered");
            }
        });
    } else {
        res.status(400).send("Username and/or email already exist");
    }
});

// temporary get request for home page
app.get('/home', (req, res)=>{
   res.status(200).sendFile(__dirname + '/public/logout.html')
});

// Present html 
app.get('/', function(req, res, next){
    res.status(200).sendFile(__dirname + '/public/login.html');
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
