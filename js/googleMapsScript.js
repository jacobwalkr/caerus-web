var geocoder;
var map;
var circle;
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
//Draw a lightbox. Argument is lightbox id
function drawLightbox(lightboxID) {
    $("<div/>", {
    id: lightboxID,
    class: "lightbox"
    }).prependTo("body");
    $("<div/>", {
    id: lightboxID + "Greyout",
    class: "lightboxGreyout"
    }).prependTo("body");
};
//Add pin to map
function codeAddress(pinColour) {
    var customIcon;
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
        //Not getting images properly
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
    window.marker = new google.maps.Marker({
        map: map,
        position: map.getCenter(),
        draggable: true,
        icon: pin
    });
    google.maps.event.addListener(marker,"click",function() {drawLightbox("markerLightbox")});
    circle = new google.maps.Circle({
        map: map,
        fillColor:pinColour,
        fillOpacity:0.5,
        strokeColor:pinColour,
        center: window.marker.getPosition(),
        radius: parseInt(document.getElementById("circleRadius").value)
    });
    circle.bindTo("center",marker,"position");
/*    var address = document.getElementById("address").value;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { "address": address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var pin = {
                url:customIcon,
                scaledSize: new google.maps.Size(20,34.09,"px","px")
            };
            window.marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                draggable: true,
                icon: pin
            });
            google.maps.event.addListener(marker,"click",drawLightbox(markerLightbox));
            circle = new google.maps.Circle({
                map: map,
                fillColor:pinColour,
                fillOpacity:0.5,
                strokeColor:pinColour,
                center: window.marker.getPosition(),
                radius: parseInt(document.getElementById("circleRadius").value)
            });
            circle.bindTo("center",marker,"position");
        }
        else if (status === "ZERO_RESULTS") {
            
        }
        else {
        alert("Geocode was not successful for the following reason: " + status);
        }
    });*/
}