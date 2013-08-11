function submitPinData(title,description,category,circleRadius,reported_as,latitude,longitude) {
    $.post(
        "http://api.reunitem.io/items/add",
        '{"title":"'+title+'","description":"'+description+'","reporter":0,"category":'+category+',"reported_as":"'+reported_as+'","latitude":'+latitude+',"longitude":'+longitude+',"radius":'+circleRadius+'}'
    );
}