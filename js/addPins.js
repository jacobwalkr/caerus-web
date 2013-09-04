//Objects for comparison when creating markers
redCategories = {"Clothing":"img/redTeePin.svg","Computers":"img/redComputerPin.svg","Keys":"img/redKeyPin.svg","Mobile Devices":"img/redPhonePin.svg","Wallets and Purses":"img/redPoundPin.svg","Other":"img/redPin.svg","Filter":"img/redPin.svg"}
blueCategories = {"Clothing":"img/blueTeePin.svg","Computers":"img/blueComputerPin.svg","Keys":"img/blueKeyPin.svg","Mobile Devices":"img/bluePhonePin.svg","Wallets and Purses":"img/bluePoundPin.svg","Other":"img/bluePin.svg","Filter":"img/bluePin.svg"}
var pinProperties = {};
function addPin(pinColour) {
    var latitude, longitude;
    if (validateForm() == false) {
        return;
    }
    var customIcon;
    var selectedCategory = $("div.cd-dropdown span").first().text();
    if (selectedCategory == "Filter") {
        return;
    }
    var circleRadius = parseInt($("#circleRadiusInput").val());
    if ($.isNumeric(circleRadius) == false) {
        circleRadius = 0;
    }
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
    var address = $("#address").val();
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( {"address": address}, function(results, status) {
        var title = $("#title").val();
        if (status == google.maps.GeocoderStatus.OK) {
            var newMarker = new google.maps.Marker({
                title: pinProperties.title,
                position: results[0].geometry.location,
                icon: pin,
                map: map,
                draggable: true
            });
            circle = new google.maps.Circle({
                map: map,
                fillColor: pinColour,
                fillOpacity: 0.5,
                strokeColor: pinColour,
                center: results[0].geometry.location,
                radius: circleRadius
            });
            circle.bindTo("center",newMarker,"position");
            if (pinColour == "#e74c3c") {
                reported_as = "lost";
            }
            else if (pinColour == "#2980b9") {
                reported_as = "found";
            }
            var description = $("#description").val();
            var category = new Array("Filter","Clothing","Computers","Keys","Mobile Devices","Wallets and Purses","Other").indexOf(selectedCategory);
            removeLightbox("markerLightbox");
//            $("#enterPrompt").css("display", "block");
            $(document).keypress(function (key) {
                if (key.which == 13) {
                    var markerPos = newMarker.getPosition();
                    latitude = markerPos.lat();
                    longitude = markerPos.lng();
                    submitPinData(title,description,category,circleRadius,reported_as,latitude,longitude);
                    drawLightbox("markerAdded");
                    newMarker.setDraggable(false);
                    $("#enterPrompt").css("display", "none");
                }
            });
        }
        else if (status === "ZERO_RESULTS") {
            var newMarker = new google.maps.Marker({
                title: pinProperties.title,
                position: map.getCenter(),
                icon: pin,
                map: map,
                draggable: true
            });
            circle = new google.maps.Circle({
                map: map,
                fillColor: pinColour,
                fillOpacity: 0.5,
                strokeColor: pinColour,
                center: map.getCenter(),
                radius: circleRadius
            });
            circle.bindTo("center",newMarker,"position");
            if (pinColour == "#e74c3c") {
                reported_as = "lost";
            }
            else if (pinColour == "#2980b9") {
                reported_as = "found";
            }
            var description = $("#description").val();
            var category = new Array("Filter","Clothing","Computers","Keys","Mobile Devices","Wallets and Purses","Other").indexOf(selectedCategory);
            removeLightbox("markerLightbox");
//            $("#enterPrompt").css("display", "block");
            $(document).keypress(function (key) {
                if (key.which == 13) {
                    var markerPos = newMarker.getPosition();
                    latitude = markerPos.lat();
                    longitude = markerPos.lng();
                    submitPinData(title,description,category,circleRadius,reported_as,latitude,longitude);
                    drawLightbox("markerAdded");
                    newMarker.setDraggable(false);
                    $("#enterPrompt").css("display", "none");
                }
            });
        }
        else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}