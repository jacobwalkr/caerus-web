function addPinFromDatabase(pinData[i]) {
    var customIcon;
    var categories = ["Filter","Clothing","Computers","Keys","Mobile Devices","Wallets and Purses","Other"];
    var circleRadius = pinData[i].radius;
    if (pinColour === "#e74c3c") {
        customIcon = redCategories[categories[pinData[i].category]];
    }
    else if (pinColour === "#2980b9") {
        customIcon = blueCategories[categories[pinData[i].category]];
    }
    var pin = {
        url: customIcon,
        scaledSize: new google.maps.Size(20,34.09,"px","px")
    };
    var markerPos = pinData[i].latitude + ", " + pinData[i].longitude;
    map.setCenter(markerPos);
    window.marker = new google.maps.Marker({
        title: pinData[i].title,
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
        center: window.marker.getPosition(),
        radius: circleRadius
    });
    circle.bindTo("center",marker,"position");
}
function listMarkers() {
    pinData = jQuery.ajax({
        url: "api.reunitem.io",
        error: alert("Could not connect to reunitem database")
    });
    var pinDataCount = pinData.count();
    for (i = 0; i < pinDataCount; i++) {
        addPinFromDatabase(pinData[i]);
    }
}