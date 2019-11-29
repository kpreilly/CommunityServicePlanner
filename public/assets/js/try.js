console.log("going");

function authenticate(){
    console.log("firing");
    
    var req = new XMLHttpRequest();
    var username = document.getElementbyId('uname').value;
    var password = document.getElementbyId('pass').value;

    var url = '/login/';

    req.open('POST', url);

    var body ={
        username,
        password
    };
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(body);
    console.log(username, ",", password);
    return false;
}

