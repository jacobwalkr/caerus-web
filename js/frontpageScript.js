var geocoder, map, circle;
var lostLightboxHTML = '<h1 class="lostHeader">Edit pin information</h1><hr class="lostRule"><form><table><tr><td><label class="lostLabel">What have you lost?</label></td><td><input type="text" id= "title" class="markerLostForm" placeholder="Item"></td></tr><tr><td><label class="lostLabel">Enter an address or postcode for the pin (optional):</label></td><td><input type="text" placeholder="Address" id="address" class="markerLostForm"></td></tr><tr><td><label class="lostLabel">Not sure where you lost it? Set an area in meters:</label></td><td><input type="text" class="markerLostForm" id="circleRadiusInput" placeholder="0"></td></tr><tr><td></td><td><input type="button" id="submitLostMarker" onclick="codeAddress(\'#e74c3c\')" value="Add marker"></td></tr></table></form>';
var foundLightboxHTML = '<h1 class="foundHeader">Edit pin information</h1><hr class="foundRule"><form><table><tr><td><label class="foundLabel">What have you found?</label></td><td><input type="text" id= "title" class="markerFoundForm" placeholder="Item"></td></tr><tr><td><label class="foundLabel">Enter an address or postcode for the pin (optional):</label></td><td><input type="text" placeholder="Address" id="address" class="markerFoundForm"></td></tr><tr><td><label class="foundLabel">Not sure where you found it? Set an area in meters:</label></td><td><input type="text" class="markerFoundForm" id="circleRadiusInput" placeholder="0"></td></tr><tr><td></td><td><input type="button" id="submitFoundMarker" onclick="codeAddress(\'#2980b9\')" value="Add marker"></td></tr></table></form>';
var loginLightboxHTML = '<iframe scr="loginForm.html"></iframe>';
function initialize() {
    var mapOptions = {
        center: new google.maps.LatLng(54, -2),
        zoom: 6,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
}
google.maps.event.addDomListener(window, "load", initialize);
var pinColour = "#e74c3c";
//Function added to JQuery to center an element
jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
    return this;
}
//Draw a lightbox. Argument is lightbox id
function drawLightbox(lightboxID) {
    $("<div/>", {
        id: lightboxID + "Greyout",
        class: "lightboxGreyout"
    }).prependTo("body");
    $("<div/>", {
        id: lightboxID,
        class: "lightbox"
    }).prependTo("body");
    $("#" + lightboxID).center();
}
//Add marker lightbox content
function addMarkerLightboxContent(pinHex) {
    if (pinHex === "#e74c3c") {
        $(lostLightboxHTML).appendTo("#markerLightbox");
    }
    else if (pinHex === "#2980b9") {
        $(foundLightboxHTML).appendTo("#markerLightbox");
    }
}
function lightboxAndContent(lightboxID,pinColour) {
    drawLightbox(lightboxID);
    addMarkerLightboxContent(pinColour);
}
//Remove lightbox and submit content
function removeLightbox(lightboxID) {
//    $("#title").value();
    $("#" + lightboxID).remove();
    var greyoutID = lightboxID + "Greyout";
    $("#" + greyoutID).remove();
}
//Add pin to map
function codeAddress(pinColour) {
    var customIcon;
    var circleRadius = parseInt(document.getElementById("circleRadiusInput").value);
    switch ($("div.cd-dropdown span").first().text()) {
        case "Clothing":
            if (pinColour === "#e74c3c") {
                customIcon = "img/redTeePin.svg";
            }
            else if (pinColour === "#2980b9") {
                customIcon = "img/blueTeePin.svg";
            }
        break;
        case "Computers":
            if (pinColour === "#e74c3c") {
                customIcon = "img/redComputerPin.svg";
            }
            else if (pinColour === "#2980b9") {
                customIcon = "img/blueComputerPin.svg";
            }
        break;
        case "Keys":
            if (pinColour === "#e74c3c") {
                customIcon = "img/redKeyPin.svg";
            }
            else if (pinColour === "#2980b9") {
                customIcon = "img/blueKeyPin.svg";
            }
        break;
        case "Mobile Devices":
            if (pinColour === "#e74c3c") {
                customIcon = "img/redPhonePin.svg";
            }
            else if (pinColour === "#2980b9") {
                customIcon = "img/bluePhonePin.svg";
            }
        break;
        case "Wallets and Purses":
            if (pinColour === "#e74c3c") {
                customIcon = "img/redPoundPin.svg";
            }
            else if (pinColour === "#2980b9") {
                customIcon = "img/bluePoundPin.svg";
            }
        break;
        case "Filter":
            alert("Please choose a category!");
        break;
        default:
            if (pinColour === "#e74c3c") {
                customIcon = "img/redPin.svg";
            }
            else if (pinColour === "#2980b9") {
                customIcon = "img/bluePin.svg";
            }
        break;
    }
    var pin = {
        url:customIcon,
        scaledSize: new google.maps.Size(20,34.09,"px","px")
    };
    var address = document.getElementById("address").value;
    var geocoder = new google.maps.Geocoder();
    var pin = {
        url:customIcon,
        scaledSize: new google.maps.Size(20,34.09,"px","px")
    };
    geocoder.geocode( { "address": address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            window.marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                draggable: true,
                icon: pin
            });
            circle = new google.maps.Circle({
                map: map,
                fillColor:pinColour,
                fillOpacity:0.5,
                strokeColor:pinColour,
                center: window.marker.getPosition(),
                radius: circleRadius
            });
            circle.bindTo("center",marker,"position");
        }
        else if (status === "ZERO_RESULTS") {
            window.marker = new google.maps.Marker({
                map: map,
                position: map.getCenter(),
                draggable: true,
                icon: pin
            });
            circle = new google.maps.Circle({
                map: map,
                fillColor: pinColour,
                fillOpacity: 0.5,
                strokeColor: pinColour,
                center: window.marker.getPosition(),
                radius: circleRadius
            });
            circle.bindTo("center",marker,"position");
        }
        else {
        alert("Geocode was not successful for the following reason: " + status);
        }
    });
    removeLightbox("markerLightbox");
}
//Lightbox opens when login button is clicked
$("#loginButton").click(function() {
    drawLightbox("loginLightbox");
    $(loginLightboxHTML).appendTo("#loginLightbox");
});