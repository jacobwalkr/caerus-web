//html to be added to lightboxes
var lostLightboxHTML = '<h1 class="lostHeader">Edit pin information</h1><input type="button" class="closeMarkerLightbox" onclick="removeLightbox(\'markerLightbox\')" value="X"><hr class="lostRule"><form><table><tr><td><label class="lostLabel">What have you lost?</label></td><td><input type="text" id= "title" class="markerLostForm" placeholder="Item"></td></tr><tr><td><label class="lostLabel"> Describe your item:</label></td><td><textarea rows="2" cols="22" id="description" class="markerLostForm" placeholder="Description"></textarea></td></tr><tr><td><label class="lostLabel">Enter an address or postcode for the pin (optional):</label></td><td><input type="text" placeholder="Address" id="address" class="markerLostForm"></td></tr><tr><td><label class="lostLabel">Not sure where you lost it? Set an area in meters:</label></td><td><input type="text" class="markerLostForm" id="circleRadiusInput" placeholder="0"></td></tr><tr><td></td><td><input type="button" id="submitLostMarker" onclick="addPin(\'#e74c3c\')" value="Add marker"></td></tr></table></form>';
var foundLightboxHTML = '<h1 class="foundHeader">Edit pin information</h1><input type="button" class="closeMarkerLightbox" onclick="removeLightbox(\'markerLightbox\')" value="X"><hr class="foundRule"><form><table><tr><td><label class="foundLabel">What have you found?</label></td><td><input type="text" id= "title" class="markerFoundForm" placeholder="Item"></td></tr><tr><td><label class="foundLabel"> Describe the item:</label></td><td><textarea rows="2" cols="22" id="description" class="markerFoundForm" placeholder="Description"></textarea></td></tr><tr><td><label class="foundLabel">Enter an address or postcode for the pin (optional):</label></td><td><input type="text" placeholder="Address" id="address" class="markerFoundForm"></td></tr><tr><td><label class="foundLabel">Not sure where you found it? Set an area in meters:</label></td><td><input type="text" class="markerFoundForm" id="circleRadiusInput" placeholder="0"></td></tr><tr><td></td><td><input type="button" id="submitFoundMarker" onclick="addPin(\'#2980b9\')" value="Add marker"></td></tr></table></form>';
var filterAlertHTML = '<h3 class="filterAlert">Please choose a category from the dropdown menu</h3><input type="button" class="closeFilterAlert" onclick="removeLightbox(\'filterAlert\')" value="X">';
var databaseAlertHTML = '<h3 class="databaseAlert">Unable to connect to reunitem database</h3>';
var loginLightboxHTML = '<input type="button" class="closeLoginLightbox" onclick="removeLightbox(\'loginLightbox\')" value="X"><iframe src="loginForm.html"></iframe>';
var videoHTML = '<input type="button" class="closeVideoLightbox" onclick="removeLightbox(\'videoLightbox\')" value="X">'
//Function added to JQuery to horiontally center an element
jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("left", ($(window).width() - $(this).outerWidth()) / 2);
    return this;
}
function drawLightbox(lightboxID) {
    removeLightbox("loginLightbox");
    removeLightbox("markerLightbox");
    removeLightbox("databaseAlert");
    removeLightbox("filterAlert");
    $("<div/>", {
        id: lightboxID + "Greyout",
        class: "lightboxGreyout"
    }).prependTo("body");
    $("<div/>", {
        id: lightboxID,
        class: "lightbox"
    }).prependTo("body");
    $("#" + lightboxID).center();
    if (lightboxID == "loginLightbox") {
        $(loginLightboxHTML).appendTo("#loginLightbox");
    }
    else if (lightboxID == "databaseAlert") {
        $(databaseAlertHTML).appendTo("#databaseAlert");
        $(databaseAlert).css("left", "400px");
    }
    else if (lightboxID == "filterAlert") {
        $(filterAlertHTML).appendTo("#filterAlert");
        $(filterAlert).css("left", "400px");
    }
}
function addMarkerLightboxContent(pinHex) {
    if (pinHex === "#e74c3c") {
        $(lostLightboxHTML).appendTo("#markerLightbox");
    }
    else if (pinHex === "#2980b9") {
        $(foundLightboxHTML).appendTo("#markerLightbox");
    }
}
function lightboxAndContent(lightboxID,pinColour) {
    if ($("div.cd-dropdown span").first().text() == "Filter") {
        drawLightbox("filterAlert");
        return;
    }
    drawLightbox(lightboxID);
    addMarkerLightboxContent(pinColour);
}
function removeLightbox(lightboxID) {
    $("#" + lightboxID).remove();
    var greyoutID = lightboxID + "Greyout";
    $("#" + greyoutID).remove();
}
//Adds a lightbox when video button is clicked to embed video
$(video).click (function() {
    drawLightbox("videoLightbox");
    $(videoHTML).appendTo("#videoLightbox");
});