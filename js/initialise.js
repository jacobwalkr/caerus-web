//Adds single pin at a time. The function listMarkers calls more than once in order to add all pins
function addPinFromDatabase(pinData) {
    var customIcon;
    var categories = ["Filter","Clothing","Computers","Keys","Mobile Devices","Wallets and Purses","Other"];
    if (pinData.reported_as == "lost") {
        pinColour = "#e74c3c";
    }
    else if (pinData.reported_as == "found") {
        pinColour = "#2980b9";
    }
    if (pinColour == "#e74c3c") {
        customIcon = redCategories[categories[pinData.category]];
    }
    else if (pinColour == "#2980b9") {
        customIcon = blueCategories[categories[pinData.category]];
    }
    var pin = {
        url: customIcon,
        scaledSize: new google.maps.Size(20,34.09,"px","px")
    };
    var markerPos = new google.maps.LatLng(pinData.latitude,pinData.longitude);
    map.setCenter(markerPos);
    window.marker = new google.maps.Marker({
        title: pinData.title,
        map: map,
        position: markerPos,
        draggable: false,
        icon: pin
    });
    circle = new google.maps.Circle({
        map: map,
        fillColor: pinColour,
        fillOpacity: 0.5,
        strokeColor: pinColour,
        center: window.marker.getPosition(),
        radius: pinData.radius
    });
    google.maps.event.addListener(marker, "click", function () {
        alert("Claim " + pinData.title);
    });
}
function listMarkers() {
    $.ajax({
        dataType: "jsonp",
        mimeType: "application/javascript",
        url: "http://api.reunitem.io/items",
//        error: drawLightbox("databaseAlert"),
        success: function(data) {
            var pinDataCount = data.length;
            for (var i = 0; i < pinDataCount; i++) {
                addPinFromDatabase(data[i]);
            }
        }
    });
}
function initialise() {
    var mapOptions = {
        center: new google.maps.LatLng(54, -2),
        zoom: 6,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
    listMarkers();
}
google.maps.event.addDomListener(window, "load", initialise);