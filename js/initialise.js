var markersArray = [];
var circlesArray = [];
var circleDrawn = false;
var circle1Num;
var circle2Num;
var circle3Num;
var circle4Num ;
var circle5Num;
//Adds single pin at a time. The function listMarkers calls more than once in order to add all pins
function addPinFromDatabase(pinData) {
    if (map.getZoom() > 8) {
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
        window.marker = new google.maps.Marker({
            title: pinData.title,
            map: window.map,
            position: markerPos,
            draggable: false,
            icon: pin
        });
        circle = new google.maps.Circle({
            map: window.map,
            fillColor: pinColour,
            fillOpacity: 0.5,
            strokeColor: pinColour,
            center: window.marker.getPosition(),
            radius: pinData.radius
        });
        google.maps.event.addListener(marker, "click", function () {
            var bOrR = marker.icon.url.charAt(4)
            if (bOrR == "b") {
                drawLightbox("claimLightbox");
            } 
        });
        markersArray.push(marker);
        circlesArray.push(circle);
    }
    else if (map.getZoom() <= 8) {
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
        window.marker = new google.maps.Marker({
            title: pinData.title,
            map: window.map,
            position: markerPos,
            draggable: false,
            icon: pin,
            visible: false
        });
        circle = new google.maps.Circle({
            map: window.map,
            fillColor: pinColour,
            fillOpacity: 0.5,
            strokeColor: pinColour,
            center: window.marker.getPosition(),
            radius: pinData.radius,
            visible: false
        });
        google.maps.event.addListener(marker, "click", function () {
            var bOrR = marker.icon.url.charAt(4)
            if (bOrR == "b") {
                drawLightbox("claimLightbox");
            } 
        });
        markersArray.push(marker);
        circlesArray.push(circle);
        if (circleDrawn === false) {
            circle1 = new google.maps.Circle({
                map: window.map,
                fillColor: "#8e44ad",
                fillOpacity: 0.5,
                strokeColor: "#8e44ad",
                center: new google.maps.LatLng(57, -4),
                radius: 140000
            });
            circlesArray.push(circle);
            circle2 = new google.maps.Circle({
                map: window.map,
                fillColor: "#8e44ad",
                fillOpacity: 0.5,
                strokeColor: "#8e44ad",
                center: new google.maps.LatLng(54.5, -2.2),
                radius: 140000
            });
            circlesArray.push(circle);
            circle3 = new google.maps.Circle({
                map: window.map,
                fillColor: "#8e44ad",
                fillOpacity: 0.5,
                strokeColor: "#8e44ad",
                center: new google.maps.LatLng(52, 0),
                radius: 140000
            });
            circlesArray.push(circle);
            circle4 = new google.maps.Circle({
                map: window.map,
                fillColor: "#8e44ad",
                fillOpacity: 0.5,
                strokeColor: "#8e44ad",
                center: new google.maps.LatLng(52.2, -4.3),
                radius: 140000
            });
            circlesArray.push(circle);
            circle5 = new google.maps.Circle({
                map: window.map,
                fillColor: "#8e44ad",
                fillOpacity: 0.5,
                strokeColor: "#8e44ad",
                center: new google.maps.LatLng(54, -8),
                radius: 140000
            });
            circlesArray.push(circle);
            circleDrawn = true;
        }
        if (circle1.getBounds().contains(marker.getPosition())) {
            circle1Num++
        }
        else if (circle2.getBounds().contains(marker.getPosition())) {
            circle2Num++
        }
        else if (circle3.getBounds().contains(marker.getPosition())) {
            circle3Num++
        }
        else if (circle4.getBounds().contains(marker.getPosition())) {
            circle4Num++
        }
        else if (circle5.getBounds().contains(marker.getPosition())) {
            circle5Num++
        }
    }
}
function listMarkers() {
    circle1Num = 0;
    circle2Num = 0;
    circle3Num = 0;
    circle4Num = 0;
    circle5Num = 0;
    $.ajax({
        dataType: "jsonp",
        mimeType: "application/javascript",
        url: "http://api.reunitem.io/items",
//        error: drawLightbox("databaseAlert"),
        success: function(data) {
            window.pinDataCount = data.length;
            for (var i = 0; i < pinDataCount; i++) {
                addPinFromDatabase(data[i]);
            }
            var circle1Content = circle1Num + " markers";
            var circle2Content = circle2Num + " markers";
            var circle3Content = circle3Num + " markers";
            var circle4Content = circle4Num + " markers";
            var circle5Content = circle5Num + " markers";
            if (map.getZoom() <= 8) {
                infoWindow1 = new google.maps.InfoWindow({
                    position: new google.maps.LatLng(57, -4),
                    content: circle1Content,
                    disableAutoPan: true
                });
                infoWindow2 = new google.maps.InfoWindow({
                    position: new google.maps.LatLng(54.5, -2.2),
                    content: circle2Content,
                    disableAutoPan: true
                });
                infoWindow3 = new google.maps.InfoWindow({
                    position: new google.maps.LatLng(52, 0),
                    content: circle3Content,
                    disableAutoPan: true
                });
                infoWindow4 = new google.maps.InfoWindow({
                    position: new google.maps.LatLng(52.2, -4.3),
                    content: circle4Content,
                    disableAutoPan: true
                });
                infoWindow5 = new google.maps.InfoWindow({
                    position: new google.maps.LatLng(54, -8),
                    content: circle5Content,
                    disableAutoPan: true
                });
                infoWindow1.open(map);
                infoWindow2.open(map);
                infoWindow3.open(map);
                infoWindow4.open(map);
                infoWindow5.open(map);
            }
        }
    });
}

function clearMarkers() {
    if (markersArray) {
        for (i in markersArray) {
        markersArray[i].setMap(null);
        }
    }
    if (markersArray) {
        for (i in markersArray) {
            markersArray[i].setMap(null);
        }
        markersArray.length = 0;
    }
    if (circlesArray) {
        for (i in circlesArray) {
        circlesArray[i].setMap(null);
        }
    }
    if (circlesArray) {
        for (i in circlesArray) {
            circlesArray[i].setMap(null);
        }
        circlesArray.length = 0;
    }
    circle1.setMap(null);
    circle2.setMap(null);
    circle3.setMap(null);
    circle4.setMap(null);
    circle5.setMap(null);
    circleDrawn = false;
    infoWindow1.close();
    infoWindow2.close();
    infoWindow3.close();
    infoWindow4.close();
    infoWindow5.close();
};

function updateMarkers() {
    circle1Num = 0;
    circle2Num = 0;
    circle3Num = 0;
    circle4Num = 0;
    circle5Num = 0;
    clearMarkers();
    //Add markers only from selected category
    $.ajax({
        dataType: "jsonp",
        mimeType: "application/javascript",
        url: "http://api.reunitem.io/items",
//        error: drawLightbox("databaseAlert"),
        success: function(data) {
            window.pinDataCount = data.length;
            for (var i = 0; i < pinDataCount; i++) {
                var selectedCategory = $("div.cd-dropdown span").first().text();
                if (selectedCategory == "Filter") {
                    addPinFromDatabase(data[i]);
                }
                else if (selectedCategory == "Clothing") {
                    if (data[i].category == 1) {
                        addPinFromDatabase(data[i]);
                    }
                }
                else if (selectedCategory == "Computers") {
                    if (data[i].category == 2) {
                        addPinFromDatabase(data[i]);
                    }
                }
                else if (selectedCategory == "Keys") {
                    if (data[i].category == 3) {
                        addPinFromDatabase(data[i]);
                    }
                }
                else if (selectedCategory == "Mobile Devices") {
                    if (data[i].category == 4) {
                        addPinFromDatabase(data[i]);
                    }
                }
                else if (selectedCategory == "Wallets and Purses") {
                    if (data[i].category == 5) {
                        addPinFromDatabase(data[i]);
                    }
                }
                else if (selectedCategory == "Other") {
                    if (data[i].category == 6) {
                        addPinFromDatabase(data[i]);
                    }
                }
            }
            circle1Content = circle1Num + " markers";
            circle2Content = circle2Num + " markers";
            circle3Content = circle3Num + " markers";
            circle4Content = circle4Num + " markers";
            circle5Content = circle5Num + " markers";
            if (map.getZoom() <= 8) {
                infoWindow1 = new google.maps.InfoWindow({
                    position: new google.maps.LatLng(57, -4),
                    content: circle1Content,
                    disableAutoPan: true
                });
                infoWindow2 = new google.maps.InfoWindow({
                    position: new google.maps.LatLng(54.5, -2.2),
                    content: circle2Content,
                    disableAutoPan: true
                });
                infoWindow3 = new google.maps.InfoWindow({
                    position: new google.maps.LatLng(52, 0),
                    content: circle3Content,
                    disableAutoPan: true
                });
                infoWindow4 = new google.maps.InfoWindow({
                    position: new google.maps.LatLng(52.2, -4.3),
                    content: circle4Content,
                    disableAutoPan: true
                });
                infoWindow5 = new google.maps.InfoWindow({
                    position: new google.maps.LatLng(54, -8),
                    content: circle5Content,
                    disableAutoPan: true
                });
                infoWindow1.open(map);
                infoWindow2.open(map);
                infoWindow3.open(map);
                infoWindow4.open(map);
                infoWindow5.open(map);
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
    window.map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
    listMarkers();
    google.maps.event.addListener(window.map, 'zoom_changed', function() {
        updateMarkers();
    });
}
google.maps.event.addDomListener(window, "load", initialise);
$(window).click(function() {
    updateMarkers();
});