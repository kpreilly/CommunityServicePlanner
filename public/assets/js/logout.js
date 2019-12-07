// Change header
let username = localStorage.getItem('user');
let replace = document.getElementById('username');
replace.innerText = username;

let logout = document.getElementById('logout');
logout.addEventListener('click', (event)=>{
    // request to return to login
    let req = new XMLHttpRequest();
    req.open('POST', '/logout');
    let out = {
        username
    }

    let body = JSON.stringify(out);

    req.setRequestHeader('Content-Type', 'application/json');
    req.send(body);
    // on succes redirect
    req.addEventListener('load', (event)=>{
        if(event.target.status === 200){
            localStorage.removeItem('user', username);
            window.location.href="/";
        }
        else{
            alert(event.target.response);
        }
    });
})
document.getElementById('create').addEventListener('click', ()=>{
    window.location.href="/create";
})
document.getElementById('view').addEventListener('click', ()=>{
    window.location.href="/events";
})
