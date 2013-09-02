//Objects for comparison when creating markers
redCategories = {"Clothing":"img/redTeePin.svg","Computers":"img/redComputerPin.svg","Keys":"img/redKeyPin.svg","Mobile Devices":"img/redPhonePin.svg","Wallets and Purses":"img/redPoundPin.svg","Other":"img/redPin.svg","Filter":"img/redPin.svg"}
blueCategories = {"Clothing":"img/blueTeePin.svg","Computers":"img/blueComputerPin.svg","Keys":"img/blueKeyPin.svg","Mobile Devices":"img/bluePhonePin.svg","Wallets and Purses":"img/bluePoundPin.svg","Other":"img/bluePin.svg","Filter":"img/bluePin.svg"}
var pinProperties = {};
pinProperties.title = $("#title").val();
pinProperties.markerPos;
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
        if (status == google.maps.GeocoderStatus.OK) {
            pinProperties.markerPos = results[0].geometry.location;
            circle = new google.maps.Circle({
                map: map,
                fillColor: pinColour,
                fillOpacity: 0.5,
                strokeColor: pinColour,
                center: markerPos,
                radius: circleRadius
            });
        }
        else if (status === "ZERO_RESULTS") {
            pinProperties.markerPos = map.getCenter();
            circle = new google.maps.Circle({
                map: map,
                fillColor: pinColour,
                fillOpacity: 0.5,
                strokeColor: pinColour,
                center: pinProperties.markerPos,
                radius: circleRadius
            });
            circle.bindTo("center",marker,"position");
        }
        else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
    pinProperties.markerPos = google.maps.GeocoderResult.geometry.location;
    pinProperties[pinProperties.title] = new google.maps.Marker({
        title: pinProperties.title,
        position: pinProperties.markerPos,
        icon: pin,
        map: map,
        draggable: true
    });
    console.log(pinProperties.markerPos);
    console.log(pinProperties[pinProperties.title].getPosition());
    circle.bindTo("center",marker,"position");
    if (pinColour == "#e74c3c") {
        reported_as = "lost";
    }
    else if (pinColour == "#2980b9") {
        reported_as = "found";
    }
    var description = $("#description").val();
    var category = new Array("Filter","Clothing","Computers","Keys","Mobile Devices","Wallets and Purses","Other").indexOf(selectedCategory);
    console.log(pinProperties.markerPos);
    latitude = pinProperties.markerPos.lat();
    longitude = pinProperties.markerPos.lng();
    removeLightbox("markerLightbox");
    $(document).keypress(function (key) {
        if (key.which == 13) {
            submitPinData(title,description,category,circleRadius,reported_as,latitude,longitude);
            drawLightbox("markerAdded");
            google.maps.Marker.setClickable(false);
        }
    });
}