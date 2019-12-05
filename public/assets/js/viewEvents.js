var url = "/viewEvents/";
document.addEventListener("DOMContentLoaded", initialize);

function createFormGroupDiv() {
    let formGroupDiv = document.createElement("div");
    formGroupDiv.classList.add("form-group");
    
    return formGroupDiv;
}

function createDateElement(date) {
    let dateElement = document.createElement("h6");
    dateElement.innerHTML = date;

    return dateElement;
}

function createTitleElement(title) {
    let titleElement = document.createElement("h3");
    titleElement.innerHTML = title;

    return titleElement;
}

function createPocElement() {
    let pocElement = document.createElement("div");
    pocElement.innerHTML = "Point of Contact";
    pocElement.classList.add("pocDiv");
    pocElement.classList.add("label");

    return pocElement;
}

function createEventImage() {
    let eventImage = document.createElement("img");
    eventImage.src = "assets/images/eventStock.jpg";
    eventImage.classList.add("eventImg");

    return eventImage;
}

function createContactSection(contact) {
    let profileImage = document.createElement("img");
    profileImage.src = "assets/images/profileStock.jpg";
    profileImage.classList.add("profileImg");

    let profileSpan = document.createElement("span");
    profileSpan.classList.add("profileSpan");

    let contactText = document.createTextNode("  " + contact);

    profileSpan.appendChild(profileImage);
    profileSpan.appendChild(contactText);

    return profileSpan;
}

function createContactEventDiv(pocElement, eventImage, profileSpan) {
    let contactAndEventDiv = document.createElement("div");
    contactAndEventDiv.appendChild(pocElement);
    contactAndEventDiv.appendChild(eventImage);
    contactAndEventDiv.appendChild(profileSpan);

    return contactAndEventDiv;
}

function createJoinButton() {
    let joinBtn = document.createElement("button");
    joinBtn.type = "button";
    joinBtn.innerHTML = "Join";
    joinBtn.classList.add("btn");
    joinBtn.classList.add("btn-primary");
    joinBtn.classList.add("btn-block");
    joinBtn.style.padding = "9px";

    let joinBtnDiv = document.createElement("div");
    joinBtnDiv.classList.add("form-group");
    joinBtnDiv.style.margin = "16px, 0px";

    joinBtnDiv.appendChild(joinBtn);

    return joinBtnDiv;
}

function createTimeSection(time) {
    let timeSpan = document.createElement("span");
    timeSpan.innerHTML = "Time: ";
    timeSpan.classList.add("label");

    let timeDiv = document.createElement("div");
    timeDiv.style.paddingLeft = "9px";

    let timeText = document.createTextNode("  " + time);

    timeDiv.appendChild(timeSpan);
    timeDiv.appendChild(timeText);

    return timeDiv;
}

function createDescLabelDiv() {
    let descLabelDiv = document.createElement("div");
    descLabelDiv.innerHTML = "Description";
    descLabelDiv.classList.add("label");
    descLabelDiv.style.paddingLeft = "9px";

    return descLabelDiv;
}

function createDescSection(description) {
    let descTextDiv = document.createElement("div");
    descTextDiv.innerHTML = description;
    descTextDiv.classList.add("descText");

    let descDiv = document.createElement("div");
    descDiv.classList.add("descDiv");
    descDiv.style.paddingLeft = "9px"

    descDiv.appendChild(descTextDiv);

    return descDiv;
}

function createLocLabelDiv() {
    let locLabelDiv = document.createElement("div");
    locLabelDiv.innerHTML = "Location:";
    locLabelDiv.classList.add("label");
    locLabelDiv.style.paddingLeft = "9px";

    return locLabelDiv;
}

function createLocationDiv(location) {
    let locationDiv = document.createElement("div");
    locationDiv.innerHTML = location;
    locationDiv.classList.add("descText");
    locationDiv.style.paddingLeft = "9px";

    return locationDiv;
}

function createLocationImgElement() {
    let locationImg = document.createElement("img");
    locationImg.src = "assets/images/locationStock.jpg";
    locationImg.classList.add("locImg");

    let locImgDiv = document.createElement("div");
    locImgDiv.classList.add("imgDiv");

    locImgDiv.appendChild(locationImg);

    return locImgDiv;
}
 
function buildEvents(response) {
    for (const event of response.events) {
        // Get event date
        let title = event.title;
        let location = event.location;
        let description = event.description;
        let contact = event.contactname;
        let date = event.date;
        let time = event.start;

        // Create all of the necessary elements
        let formGroupDiv = createFormGroupDiv();
        let dateElement = createDateElement(date);
        let titleElement = createTitleElement(title);
        let pocElement = createPocElement();
        let eventImage = createEventImage();
        let profileSpan = createContactSection(contact);
        let contactAndEventDiv = createContactEventDiv(pocElement, eventImage, profileSpan);
        let joinBtnDiv = createJoinButton();
        let timeDiv = createTimeSection(time);
        let descLabelDiv = createDescLabelDiv();
        let descDiv = createDescSection(description);
        let locLabelDiv = createLocLabelDiv();
        let locationDiv = createLocationDiv(location);
        let locImgDiv = createLocationImgElement();

        // Build the view
        formGroupDiv.appendChild(dateElement);
        formGroupDiv.appendChild(titleElement);
        formGroupDiv.appendChild(contactAndEventDiv);
        formGroupDiv.appendChild(joinBtnDiv);
        formGroupDiv.appendChild(timeDiv);
        formGroupDiv.appendChild(descLabelDiv);
        formGroupDiv.appendChild(descDiv);
        formGroupDiv.appendChild(locLabelDiv);
        formGroupDiv.appendChild(locationDiv);
        formGroupDiv.appendChild(locImgDiv);

        // Append to the form root
        let formRootNode = document.getElementById("events");
        formRootNode.appendChild(formGroupDiv);

    }
}

function initialize() {
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.setRequestHeader('Accept', 'application/json');
    req.addEventListener('load', function () {
        if (req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            buildEvents(response);
        } else {
        console.log("Error in network request: " + req.statusText);
        }
    });
    req.send(null);
    event.preventDefault();
}