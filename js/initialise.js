var markersArray = [];
var circlesArray = [];
var mcStyles = [
    {
        opt_textColor: 'white',
        url: 'img/markercluster.png',
        height: 48,
        width: 50
    },
    {
        opt_textColor: 'white',
        url: 'img/markercluster.png',
        height: 48,
        width: 50
    },
    {
        opt_textColor: 'white',
        url: 'img/markercluster.png',
        height: 48,
        width: 50
    },
];
var mcOptions = {gridSize: 100, styles: mcStyles, maxZoom: 15};
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
function listMarkers() {
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
            window.mc = new MarkerClusterer(map, markersArray, mcOptions);
        }
    });
}

function clearMarkersArray() {
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
    window.mc.clearMarkers();
};

function updateMarkersArray() {
    clearMarkersArray();
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
            window.mc = new MarkerClusterer(map, markersArray, mcOptions);
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
}
google.maps.event.addDomListener(window, "load", initialise);
$(window).click(function() {
    updateMarkersArray();
});