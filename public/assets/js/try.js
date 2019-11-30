var form = document.getElementById('login');

function authenticate(){
    // Open xml request
    var req = new XMLHttpRequest();
    var username = document.getElementById('uname').value;
    var password = document.getElementById('pass').value;
    
    // Url for post
    var url = '/login/';
    req.open('POST', url);

    var cred ={
        username,
        password
    };
    var body = JSON.stringify(cred);

    // Alert return 
    req.addEventListener('load', (event)=>{
        if(event.target.status === 200){
            alert(event.target.response);
        }
        else{
            alert(event.target.response);
        }
    });

    req.setRequestHeader('Content-Type', 'application/json');
    req.send(body);
}
// On form submit, prevent reload and authenticate
form.addEventListener('submit', (event) =>{
    event.preventDefault();
    authenticate();
});