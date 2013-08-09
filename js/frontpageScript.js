var geocoder, map, circle;
//html to be added to lightboxes
var lostLightboxHTML = '<h1 class="lostHeader">Edit pin information</h1><input type="button" class="closeMarkerLightbox" onclick="removeLightbox(\'markerLightbox\')" value="X"><hr class="lostRule"><form><table><tr><td><label class="lostLabel">What have you lost?</label></td><td><input type="text" id= "title" class="markerLostForm" placeholder="Item"></td></tr><tr><td><label class="lostLabel">Enter an address or postcode for the pin (optional):</label></td><td><input type="text" placeholder="Address" id="address" class="markerLostForm"></td></tr><tr><td><label class="lostLabel">Not sure where you lost it? Set an area in meters:</label></td><td><input type="text" class="markerLostForm" id="circleRadiusInput" placeholder="0"></td></tr><tr><td></td><td><input type="button" id="submitLostMarker" onclick="addPin(\'#e74c3c\')" value="Add marker"></td></tr></table></form>';
var foundLightboxHTML = '<h1 class="foundHeader">Edit pin information</h1><input type="button" class="closeMarkerLightbox" onclick="removeLightbox(\'markerLightbox\')" value="X"><hr class="foundRule"><form><table><tr><td><label class="foundLabel">What have you found?</label></td><td><input type="text" id= "title" class="markerFoundForm" placeholder="Item"></td></tr><tr><td><label class="foundLabel">Enter an address or postcode for the pin (optional):</label></td><td><input type="text" placeholder="Address" id="address" class="markerFoundForm"></td></tr><tr><td><label class="foundLabel">Not sure where you found it? Set an area in meters:</label></td><td><input type="text" class="markerFoundForm" id="circleRadiusInput" placeholder="0"></td></tr><tr><td></td><td><input type="button" id="submitFoundMarker" onclick="addPin(\'#2980b9\')" value="Add marker"></td></tr></table></form>';
var loginLightboxHTML = '<input type="button" class="closeLoginLightbox" onclick="removeLightbox(\'loginLightbox\')" value="X"><iframe src="loginForm.html"></iframe>';
//Objects for comparison when creating markers
redCategories = {"Clothing":"img/redTeePin.svg","Computers":"img/redComputerPin.svg","Keys":"img/redKeyPin.svg","Mobile Devices":"img/redPhonePin.svg","Wallets and Purses":"img/redPoundPin.svg","Other":"img/redPin.svg","Filter":"img/redPin.svg"}
blueCategories = {"Clothing":"img/blueTeePin.svg","Computers":"img/blueComputerPin.svg","Keys":"img/blueKeyPin.svg","Mobile Devices":"img/bluePhonePin.svg","Wallets and Purses":"img/bluePoundPin.svg","Other":"img/bluePin.svg","Filter":"img/bluePin.svg"}
function initialize() {
    var mapOptions = {
        center: new google.maps.LatLng(54, -2),
        zoom: 6,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
    listMarkers();
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
function drawLightbox(lightboxID) {
    removeLightbox("loginLightbox");
    removeLightbox("markerLightbox");
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
    drawLightbox(lightboxID);
    addMarkerLightboxContent(pinColour);
}
function removeLightbox(lightboxID) {
//    $("#title").value();
    $("#" + lightboxID).remove();
    var greyoutID = lightboxID + "Greyout";
    $("#" + greyoutID).remove();
}
function addPin(pinColour) {
    var customIcon;
    var selectedCategory = $("div.cd-dropdown span").first().text();
    var circleRadius = parseInt($("#circleRadiusInput").val());
    if (pinColour === "#e74c3c") {
        customIcon = redCategories[selectedCategory];
    }
    else if (pinColour === "#2980b9") {
        customIcon = blueCategories[selectedCategory];
    }
    var pin = {
        url: customIcon,
        scaledSize: new google.maps.Size(20,34.09,"px","px")
    };
    //Changes the address or postcode given to a Latlng
    var address = document.getElementById("address").value;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( {"address": address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            markerPos = results[0].geometry.location;
            map.setCenter(markerPos);
            window.marker = new google.maps.Marker({
                title: $("#title").value,
                map: map,
                position: markerPos,
                draggable: true,
                icon: pin
            });
            circle = new google.maps.Circle({
                map: map,
                fillColor: pinColour,
                fillOpacity: 0.5,
                strokeColor: pinColour,
                center: markerPos,
                radius: circleRadius
            });
            circle.bindTo("center",marker,"position");
        }
        else if (status === "ZERO_RESULTS") {
            markerPos = map.getCenter();
            window.marker = new google.maps.Marker({
                title: title,
                map: map,
                position: markerPos,
                draggable: true,
                icon: pin
            });
            circle = new google.maps.Circle({
                map: map,
                fillColor: pinColour,
                fillOpacity: 0.5,
                strokeColor: pinColour,
                center: markerPos,
                radius: circleRadius
            });
            circle.bindTo("center",marker,"position");
        }
        else {
        alert("Geocode was not successful for the following reason: " + status);
        }
    });
    submitPinData(title,description,selectedCategory,markerPos,circleRadius,user);
    removeLightbox("markerLightbox");
}
//Returns true if the radii of the circles overlap
function circleOverlapTest(marker1,marker2,circle1,circle2) {
    if (computeDistanceBetween(marker1.position,marker2.position) - circle1.radius + circle1.radius > 0) {
        return true;
    }
}