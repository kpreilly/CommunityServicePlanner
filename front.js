//this is the jquery cdn for using jquery
src="https://code.jquery.com/jquery-3.4.1.slim.min.js"



    var url = "";
    document.addEventListener("DOMContentLoaded", bindButtons);
    document.addEventListener("DOMContentLoaded", bindUsernameField);
    document.addEventListener("DOMContentLoaded", bindEmailField);
    document.addEventListener("DOMContentLoaded", bindPasswordField);
    document.addEventListener("DOMContentLoaded", bindConfirmPasswordField);


function doPasswordsMatch(password, confPassword) {
    if (password === confPassword) {
        return true;
    }
    return false;
}

// Function source cited: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function isValidEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}




function bindButtons() {
    document.getElementById("submitBtn").addEventListener("click", function(event) {
        var username = document.getElementById("inputUsername").value;
        var email = document.getElementById("inputEmail").value;
        var passwordInput = document.getElementById("inputPassword").value;
        var confirmPasswordInput = document.getElementById("inputConfirmPassword").value;
        if (username !== "" && isValidEmail(email) && 
            passwordInput !== "" && confirmPasswordInput !== "" &&
            doPasswordsMatch(passwordInput, confirmPasswordInput)) {
            var req = new XMLHttpRequest();
            var payload = {};
            payload.type = "register";
            payload.username = document.getElementById("inputUsername").value;
            payload.email = document.getElementById("inputEmail").value;
            payload.password = document.getElementById("inputPassword").value;
        
            req.open("POST", url, true);
            req.setRequestHeader("Content-Type", "application/json");
            req.addEventListener("load", function() {
                if (req.status >= 200 && req.status < 400) {
                    window.location.href="./login.html";
                }
            });
            req.send(JSON.stringify(payload)); 
        }
        event.preventDefault();
    });
  }


  function bindUsernameField() {
    document.getElementById("inputUsername").addEventListener("input", function(event) {
        var username = document.getElementById("inputUsername").value;
        if (username === "") {
            document.getElementById("inputUsername").classList.remove("is-invalid");
            document.getElementById("inputUsername").classList.remove("is-valid");
        } else {
            document.getElementById("inputUsername").classList.add("is-valid");
        }
    });
}

function bindEmailField() {
    document.getElementById("inputEmail").addEventListener("input", function(event) {
        var email = document.getElementById("inputEmail").value;
        if (email === "") {
            document.getElementById("inputEmail").classList.remove("is-invalid");
            document.getElementById("inputEmail").classList.remove("is-valid");
        } else if (isValidEmail(email)) {
            document.getElementById("inputEmail").classList.remove("is-invalid");
            document.getElementById("inputEmail").classList.add("is-valid");
        } else {
            document.getElementById("inputEmail").classList.remove("is-valid");
            document.getElementById("inputEmail").classList.add("is-invalid");
        }
    });
}

function bindPasswordField() {
    document.getElementById("inputPassword").addEventListener("input", function(event) {
        var passwordInput = document.getElementById("inputPassword").value;
        var confirmPasswordInput = document.getElementById("inputConfirmPassword").value;
        if (passwordInput === "" && confirmPasswordInput === "") {
            document.getElementById("inputConfirmPassword").classList.remove("is-invalid");
            document.getElementById("inputConfirmPassword").classList.remove("is-valid"); 
        } else if (doPasswordsMatch(passwordInput, confirmPasswordInput)) {
            document.getElementById("inputConfirmPassword").classList.remove("is-invalid");
            document.getElementById("inputConfirmPassword").classList.add("is-valid");
        } else {
            document.getElementById("inputConfirmPassword").classList.add("is-invalid");
        }
    });
}

function bindConfirmPasswordField() {
    document.getElementById("inputConfirmPassword").addEventListener("input", function(event) {
        var passwordInput = document.getElementById("inputPassword").value;
        var confirmPasswordInput = document.getElementById("inputConfirmPassword").value;
        if (passwordInput === "" && confirmPasswordInput === "") {
            document.getElementById("inputConfirmPassword").classList.remove("is-invalid");
            document.getElementById("inputConfirmPassword").classList.remove("is-valid");
        } else if (doPasswordsMatch(passwordInput, confirmPasswordInput)) {
            document.getElementById("inputConfirmPassword").classList.remove("is-invalid");
            document.getElementById("inputConfirmPassword").classList.add("is-valid");
        } else {
            document.getElementById("inputConfirmPassword").classList.add("is-invalid");
        }
    });
}

//HERE IS CHRISTINE's SCRIPT
//this funciton formats the form entries and passes them to server side
function createJSONObj(iform){


    //package form data into an object
    let newObj = {  user: iform.uname.value,
                    password: iform.pw.value,
                    email: iform.email.value}

    //change this to a stringified object
  console.log(newObj);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // document.getElementById("demo").innerHTML = this.responseText;
        }
    };

    xhttp.open("POST", "http://localhost:8081/", true);
    xhttp.setRequestHeader('Content-type', 'application/json');

    // var params = JSON.stringify(newObj);
    xhttp.send(JSON.stringify(newObj));



}
