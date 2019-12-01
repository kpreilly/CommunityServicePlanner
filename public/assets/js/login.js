let form = document.getElementById('login');

function authenticate(){
    // Open xml request
    let req = new XMLHttpRequest();
    let username = document.getElementById('uname').value;
    let password = document.getElementById('pass').value;
    
    if((username === '')||(password === '')){
        alert("No empty fields!");
        return false;
    }
    
    // Url for post
    let url = '/login/';
    req.open('POST', url);

    let cred ={
        username,
        password
    };
    let body = JSON.stringify(cred);

    // Alert return 
    req.addEventListener('load', (event)=>{
        if(event.target.status === 200){
            localStorage.setItem('user', username);
            window.location.href="./logout.html";
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

document.getElementById('registerBtn').addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href="./register.html";
})
