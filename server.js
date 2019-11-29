var path = require('path');
var express = require('express');

var app = express();
var userData = require('./users.json');

app.post('/login', function(req,res,next){
    var param = req.params.cred;
    console.log("Posted:", param);
    /*
        Verify credentials
        if(userData[username]){
            if(userData[username].oasswird === password){
                res.status(200).send("Logged in");
            }
        }
        else{
            res.status(401).send("User DNE");
        }
    */
    res.status(200).send("DONE");
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