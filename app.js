const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const fs = require('fs');


app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', (req, res) => {

    fs.readFile('users.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
            obj = JSON.parse(data); //now it an object
            obj.table.push({user: req.body.user, pw: req.body.password, email: req.body.email}); //add some data
            json = JSON.stringify(obj); //convert it back to json
            fs.writeFile('users.json', json, 'utf8', function (err) {
            if (err) throw err;
            console.log('Replaced!');
             }); // write it back
        }});

    console.log('body', req.body);
    console.log('USER:', req.body.user);
    console.log('PW:', req.body.password);
    console.log('Email:', req.body.email);
    res.sendStatus(200);
});

app.post('/admin', (req, res) => {

    var obj = {
        table: []
    };

    obj.table.push({user: "admin", pw: "admin", email: "admin@admin.com"});
    let json = JSON.stringify(obj);
   fs.writeFile('users.json', json, 'utf8', function (err) {
      if (err) throw err;
      console.log('Replaced!');
  });


    res.sendStatus(200);
});


  const server = app.listen(8081, function() {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});







module.exports = app;

