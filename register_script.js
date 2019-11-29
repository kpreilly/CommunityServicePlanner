var url = "";
document.addEventListener("DOMContentLoaded", bindButtons);
document.addEventListener("DOMContentLoaded", bindPasswordField);
document.addEventListener("DOMContentLoaded", bindConfirmPasswordField);

function doPasswordsMatch() {
    var password = document.getElementById("inputPassword").value;
    var confPassword = document.getElementById("inputConfirmPassword").value;
    if (password === confPassword) {
        return true;
    }
    return false;
}

function bindButtons() {
    document.getElementById("submitBtn").addEventListener("click", function(event) {
        if (doPasswordsMatch()) {
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
        } else {
            document.getElementById("inputUsername").classList.add("is-valid");
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
        } else if (doPasswordsMatch()) {
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
        } else if (doPasswordsMatch()) {
            document.getElementById("inputConfirmPassword").classList.remove("is-invalid");
            document.getElementById("inputConfirmPassword").classList.add("is-valid");
        } else {
            document.getElementById("inputConfirmPassword").classList.add("is-invalid");
        }
    });
}
