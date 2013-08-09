function addPinFromDatabase(pinData) {
    var customIcon;
    var categories = ["Filter","Clothing","Computers","Keys","Mobile Devices","Wallets and Purses","Other"];
    var circleRadius = pinData.radius;
    if (pinColour === "#e74c3c") {
        customIcon = redCategories[categories[pinData.category]];
    }
    else if (pinColour === "#2980b9") {
        customIcon = blueCategories[categories[pinData.category]];
    }
    var pin = {
        url: customIcon,
        scaledSize: new google.maps.Size(20,34.09,"px","px")
    };
    var markerPos = pinData.latitude + ", " + pinData[i].longitude;
    map.setCenter(markerPos);
    window.marker = new google.maps.Marker({
        title: pinData.title,
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
    var pinDataCount = pinData.length();
    for (i = 0; i < pinDataCount; i++) {
        addPinFromDatabase(pinData[i]);
    }
}
function submitPinData(title,description,category,position,circleRadius,user) {
    var latLngArray = position.split(", ");
    var latitude = latLngArray[0];
    var longitude = latLngArray[1];
    jQuery.ajax({
        type: post,
        processData: false,
        data: {title: title,description: description,category: category,latitude: lat,longitude: lng,radius: circleRadius,reporter: user}
    });
}