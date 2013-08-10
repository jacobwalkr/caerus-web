function submitPinData(title,description,category,position,circleRadius,user) {
    jQuery.ajax({
        type: post,
        url: "http://api.reunitem.io/items",
        data: {title: title,description: description,category: category,reported_as: reported_as,latitude: markerPos.lat(),longitude: markerPos.lng(),radius: circleRadius,reporter: user}
    });
}
function submitRegisterData(email,password) {
    jQuery.ajax({
        type: post,
        url: "http://api.reunitem.io/users",
        data: {user: email,password:password}
    });
}
function submitLoginData(email,password) {
    jQuery.ajax({
        type: post,
        url: "http://api.reunitem.io/users",
        data: {user: email,password:password}
    });
}