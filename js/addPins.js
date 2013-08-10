//Objects for comparison when creating markers
redCategories = {"Clothing":"img/redTeePin.svg","Computers":"img/redComputerPin.svg","Keys":"img/redKeyPin.svg","Mobile Devices":"img/redPhonePin.svg","Wallets and Purses":"img/redPoundPin.svg","Other":"img/redPin.svg","Filter":"img/redPin.svg"}
blueCategories = {"Clothing":"img/blueTeePin.svg","Computers":"img/blueComputerPin.svg","Keys":"img/blueKeyPin.svg","Mobile Devices":"img/bluePhonePin.svg","Wallets and Purses":"img/bluePoundPin.svg","Other":"img/bluePin.svg","Filter":"img/bluePin.svg"}
function addPin(pinColour) {
    if (validateForm() == false) {
        return;
    }
    var customIcon;
    var selectedCategory = $("div.cd-dropdown span").first().text();
    if (selectedCategory == "Filter") {
        return;
    }
    var circleRadius = parseInt($("#circleRadiusInput").val());
    if (circleRadius == "") {
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
    var title = $("#title").val()
    var address = $("#address").val();
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( {"address": address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            markerPos = results[0].geometry.location;
            map.setCenter(markerPos);
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
        else if (status === "ZERO_RESULTS") {
            markerPos = map.getCenter();
            window.marker = new google.maps.Marker({
                title: $("title").value,
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
    if (pinColour == "#e74c3c") {
        reported_as = "lost";
    }
    else if (pinColour == "#2980b9") {
        reported_as = "found";
    }
    var description = $("#description").val();
    var category = new Array("Filter","Clothing","Computers","Keys","Mobile Devices","Wallets and Purses","Other").indexOf(selectedCategory);
    var markerPos = window.marker.getPosition();
    var latitude = markerPos.lat();
    var longitude = markerPos.lng();
    removeLightbox("markerLightbox");
    $(document).keypress(function (key) {
        if (key.which == 13) {
            submitPinData(title,description,category,circleRadius,reported_as,latitude,longitude);
        }
    });
}