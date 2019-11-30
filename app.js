const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '/public')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('port', 8082);

app.post('/register', (req, res) => {
    let obj = {};
    obj.username = req.body.username;
    obj.email = req.body.email;
    obj.password = req.body.password;
    obj.loggedin = 0;

    fs.readFile('public/users.json', 'utf8', (err,data) => {
        let usernameExists = false;
        let emailExists = false;
        let userObj = JSON.parse(data);
        let users = userObj.users;
        users.forEach(element => {
            if (element["username"] === obj["username"]) {
                usernameExists = true;
            }
            if (element["email"] === obj["email"]) {
                emailExists = true;
            }
        });
        if (!usernameExists && !emailExists) {
            userObj.users.push(obj);
            strObj = JSON.stringify(userObj);
            fs.writeFile('public/users.json', strObj, (err) => {
                if (err) console.log(err);
            });
            res.sendStatus(200);
        } else {
            res.sendStatus(400);
        }
    });
});

app.post('/admin', (req, res) => {

    var obj = {
        table: []
    };

    obj.table.push({user: "admin", pw: "admin", email: "admin@admin.com"});
    let json = JSON.stringify(obj);
    fs.writeFile('users.json', json, 'utf8');


    res.sendStatus(200);
});


app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
  });