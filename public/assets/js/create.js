let form = document.getElementById('register');

function create(){
    let req = new XMLHttpRequest();
    req.open('POST', '/cevent');
    
    // Get Event inputs
    let title = document.getElementById('inputTitle').value;
    let location = document.getElementById('inputLocation').value;
    let description = document.getElementById('inputDescription').value;
    let contact = document.getElementById('inputContact').value;
    let notes = document.getElementById('inputNotes').value;
    let date = document.getElementById('example-date-input').value;
    let start = document.getElementById('time-start').value;
    let end = document.getElementById('time-end').value;
    //let type= document.getElementsByClassName('inputLocation');
    let dropdown = document.getElementById('typeMenu');
    let type = dropdown.options[dropdown.selectedIndex].text;
    // Event body
    let newEvent ={
        title,
        location,
        description,
        contact,
        notes,
        date,
        start,
        end,
        type,
    }
    console.log(newEvent);
    let body = JSON.stringify(newEvent);

    // Alert return 
    req.addEventListener('load', (event)=>{
        if(event.target.status === 200){
            alert(event.target.response);
            window.location.href="/";
        }
        else{
            alert(event.target.response);
        }
    });

    req.setRequestHeader('Content-Type', 'application/json');
    req.send(body);

}

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    create();
})