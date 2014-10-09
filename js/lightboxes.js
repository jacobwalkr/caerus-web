//get width of the viewport
var viewportWidth = $(window).width();
//html to be added to lightboxes
var lostLightboxHTML = '<h1 class="lostHeader">Edit pin information</h1><input type="button" class="closeMarkerLightbox" onclick="removeLightbox(\'markerLightbox\')" value="X"><hr class="lostRule"><form name="markerForm"><table><tr><td><label class="lostLabel">What have you lost?</label></td><td><input type="text" id="title" class="markerLostForm" name="title" placeholder="Item"></td></tr><tr><td><label class="lostLabel"> Describe your item:</label></td><td><textarea rows="2" cols="22" id="description" class="markerLostForm" placeholder="Description"></textarea></td></tr><tr><td><label class="lostLabel">Enter an address or postcode for the pin (optional):</label></td><td><input type="text" placeholder="Address" id="address" class="markerLostForm"></td></tr><tr><td><label class="lostLabel">Not sure where you lost it? Set a radius in meters:</label></td><td><input type="text" class="markerLostForm" id="circleRadiusInput" name="radius" placeholder="0"></td></tr><tr><td><label class="lostLabel" id="instructionsLost">You can drag the pin around the map. Press enter to submit when you have finished.</label></td><td><input type="button" id="submitLostMarker" onclick="addPin(\'#e74c3c\')" value="Add marker"></td></tr></table></form>';
var foundLightboxHTML = '<h1 class="foundHeader">Edit pin information</h1><input type="button" class="closeMarkerLightbox" onclick="removeLightbox(\'markerLightbox\')" value="X"><hr class="foundRule"><form name="markerForm"><table><tr><td><label class="foundLabel">What have you found?</label></td><td><input type="text" id= "title" class="markerFoundForm" name="title" placeholder="Item"></td></tr><tr><td><label class="foundLabel"> Describe the item:</label></td><td><textarea rows="2" cols="22" id="description" class="markerFoundForm" placeholder="Description"></textarea></td></tr><tr><td><label class="foundLabel">Enter an address or postcode for the pin (optional):</label></td><td><input type="text" placeholder="Address" id="address" class="markerFoundForm"></td></tr><tr><td><label class="foundLabel">Not sure where you found it? Set a radius in meters:</label></td><td><input type="text" class="markerFoundForm" id="circleRadiusInput" name="radius" placeholder="0"></td></tr><tr><td><label class="foundLabel" id="instructionsFound">You can drag the pin around the map. Press enter to submit when you have finished.</label></td><td><input type="button" id="submitFoundMarker" onclick="addPin(\'#2980b9\')" value="Add marker"></td></tr></table></form>';
var filterAlertHTML = '<h3 class="filterAlert">Please choose a category from the dropdown menu</h3><input type="button" class="closeFilterAlert" onclick="removeLightbox(\'filterAlert\')" value="X">';
<<<<<<< HEAD
var markerAddedHTML = '<h3 class="filterAlert">Your item has been added to the database</h3><input type="button" class="closeFilterAlert" onclick="removeLightbox(\'markerAdded\')" value="X">';
var databaseAlertHTML = '<h3 class="databaseAlert">Unable to connect to reunitem database</h3>';
var loginLightboxHTML = '<input type="button" class="closeLoginLightbox" onclick="removeLightbox(\'loginLightbox\')" value="X"><div class="loginForm"><h1 class="loginh1">Enter your details</h1><hr class="loginhr"><form><input type="text" class="textInputFields logininput" id="email" placeholder="Email address"><br><input type="password" class="textInputFields logininput" id="password" placeholder="Password"><br><input type="button" id="login" class="logininput" value="Login"><br><p class="instructionsLogin">If you do not have an account one will be created for you.</p></form></div>';
var videoHTML = '<input type="button" class="closeVideoLightbox" onclick="removeLightbox(\'videoLightbox\')" value="X"><iframe class="videoiframe" width="560" height="315" src="http://www.youtube.com/embed/rIyeL36enwE?rel=0" frameborder="0" allowfullscreen></iframe>'
var claimHTML = '<h3 class="filterAlert"><input type="button" class="claim" onclick="claimItem(marker)", value="Click to claim this item!"></h3><input type="button" class="closeFilterAlert" onclick="removeLightbox(\'claimLightbox\')" value="X">';
var beenClaimedHTML = '<h3 class="filterAlert">We\'ve notified the submitter that you wish to claim this item. Please wait to hear from them.</h3><input type="button" class="closeFilterAlert" onclick="removeLightbox(\'beenClaimedLightbox\')" value="X">';
var aboutHTML = '<h1 class="about">About reunitem.io</h1><input type="button" class="closeAboutLightbox" onclick="removeLightbox(\'aboutLightbox\')" value="X"><hr class="about"><p class="about">Reunitem is a project developed for Young Rewired State Festival of Code 2013 by Jacob Walker, Barnaby Taylor, Adam Barcock, James Brooks and George Streten.<br><br>reunitem is an open-source project, so feel free to visit our github repos for <a href="https://github.com/jacobwwalker/caerus-web">web</a> and <a href="https://github.com/jacobwwalker/caerus-api">API</a>.<br><br>You can also follow us on twitter - <a href="https://twitter.com/ReunitemApp">@ReunitemApp</a>.</p>'
=======
var databaseAlertHTML = '<h3 class="databaseAlert">Unable to connect to Reunitem database</h3>';
var loginLightboxHTML = '<input type="button" class="closeLoginLightbox" onclick="removeLightbox(\'loginLightbox\')" value="X"><iframe class="loginiframe" src="loginForm.html"></iframe>';
var videoHTML = '<input type="button" class="closeVideoLightbox" onclick="removeLightbox(\'videoLightbox\')" value="X"><iframe class="videoiframe" width="560" height="315" src="//www.youtube.com/embed/rIyeL36enwE?rel=0" frameborder="0" allowfullscreen></iframe>'
var aboutHTML = '<h1 class="about">About reunitem.io</h1><input type="button" class="closeAboutLightbox" onclick="removeLightbox(\'aboutLightbox\')" value="X"><hr class="about"><p class="about">Reunitem is a project developed for Young Rewired State Festival of Code 2013 by Jacob Walker, Barnaby Taylor, Adam Barcock, James Brooks and George Stretten.<br><br>reunitem is an open-source project, so feel free to visit our github repos for <a href="https://github.com/jacobwwalker/caerus-web">web</a> and <a href="https://github.com/jacobwwalker/caerus-api">API</a>.<br><br>You can follow us on twitter <a href="https://twitter.com/ReunitemApp">@ReunitemApp</a>.</p>'
>>>>>>> responsive
//Function added to JQuery to horiontally center an element
jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("left", ($(window).width() - $(this).outerWidth()) / 2);
    return this;
}
function validateForm()
{
    var x=document.forms["markerForm"]["title"].value;
    if (x==null || x=="") {
        return false;
    }
    var x=document.forms["markerForm"]["radius"].value;
    if (x == "") {
        return;
    }
    else if ($.isNumeric(x) == false) {
        alert("The radius must be a number");
        return;
    }
}
function submitLightbox() {
    submitPinData(title,description,category,circleRadius,reported_as,latitude,longitude);
    removeLightbox("submitLightbox");
}
function drawLightbox(lightboxID) {
//removes any lightboxes already open
    removeLightbox("loginLightbox");
    removeLightbox("aboutLightbox");
    removeLightbox("videoLightbox");
    removeLightbox("markerLightbox");
    removeLightbox("databaseAlert");
    removeLightbox("filterAlert");
    removeLightbox("aboutLightbox");
    removeLightbox("videoLightbox");
    removeLightbox("claimLightbox");
    removeLightbox("beenClaimedLightbox");
    $("<div/>", {
        id: lightboxID + "Greyout",
        class: "lightboxGreyout"
    }).prependTo("body");
    $("<div/>", {
        id: lightboxID,
        class: "lightbox"
    }).prependTo("body");
    if (lightboxID == "loginLightbox") {
        $(loginLightboxHTML).appendTo("#loginLightbox");
        $("#login").click(login);
    }
    else if (lightboxID == "databaseAlert") {
        $(databaseAlertHTML).appendTo("#databaseAlert");
<<<<<<< HEAD
    }
    else if (lightboxID == "filterAlert") {
        $(filterAlertHTML).appendTo("#filterAlert");
=======
		$(databaseAlert).css("left", (viewportWidth / 2) - ($(filterAlert).width() / 2));
    }
    else if (lightboxID == "filterAlert") {
        $(filterAlertHTML).appendTo("#filterAlert");
		$(filterAlert).css("left", (viewportWidth / 2) - ($(filterAlert).width() / 2));
>>>>>>> responsive
    }
    else if (lightboxID == "markerAdded") {
        $(markerAddedHTML).appendTo("#markerAdded");
    }
    else if (lightboxID == "claimLightbox") {
        $(claimHTML).appendTo("#claimLightbox");
    }
    else if (lightboxID == "beenClaimedLightbox") {
        $(beenClaimedHTML).appendTo("#beenClaimedLightbox");
    }
    $("#" + lightboxID).center();
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
$("#video").click (function() {
    drawLightbox("videoLightbox");
    $(videoHTML).appendTo("#videoLightbox");
});
//Adds a lightbox when "about" is clicked
$("#about").click (function() {
    drawLightbox("aboutLightbox");
    $(aboutHTML).appendTo("#aboutLightbox");
});