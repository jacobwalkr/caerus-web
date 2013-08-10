function addPinFromDatabase(pinData) {
    var customIcon;
    var categories = ["Filter","Clothing","Computers","Keys","Mobile Devices","Wallets and Purses","Other"];
    if (pinColour === "#e74c3c") {
        customIcon = redCategories[categories[pinData.category]];
    }
    else if (pinColour === "#2980b9") {
        customIcon = blueCategories[categories[pinData.category]];
        console.log(customIcon);
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
        radius: parseInt(pinData.radius)
    });
}
function listMarkers() {
    var pinData;
    $.ajax({
        dataType: "jsonp",
        mimeType: "application/javascript",
        url: "http://api.reunitem.io/items",
        error: /*drawLightbox("databaseAlert"), console.log(textStatus),*/ function(jqXHR,textStatus,errorThrown) {console.log(textStatus); console.log(errorThrown);},
        success: function(data) {
            console.log(data[0]);
            var pinDataCount = data.length;
            for (i = 0; i < pinDataCount; i++) {
                addPinFromDatabase(data[i]);
            }
        }
    });
}
function submitPinData(title,description,category,position,circleRadius,user) {
    jQuery.ajax({
        type: post,
        url: "http://api.reunitem.io/items",
        data: {title: title,description: description,category: category,latitude: markerPos.lat(),longitude: markerPos.lng(),radius: circleRadius,reporter: user}
    });
}