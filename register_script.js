var url = "";
document.addEventListener("DOMContentLoaded", bindButtons);

function doPasswordsMatch() {
    var password = document.getElementById("inputPassword").value;
    var confPassword = document.getElementById("inputConfirmPassword").value;
    if (password === confPassword) {
        alert("The passwords match!");
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
        } else {
            alert("Passwords don't match");
        }
        event.preventDefault();
    });
}
