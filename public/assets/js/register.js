var url = "/register/";
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
            req.addEventListener("load", function(event) {
                if (req.status >= 200 && req.status < 400) {
                    window.location.href="./login.html";
                } else {
                    alert(event.target.response);
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