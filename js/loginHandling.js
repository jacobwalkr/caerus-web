function login() {
    var email = $.("#email").val();
    var password = $.("#password").val();
    $.post(
        "http://api.reunitem.io/users/login",
        '{"email":"'+email'","password":"'+password+'"}'
    )
    $.ajax({
        dataType: "jsonp",
        mimeType: "application/javascript",
        url: "http://api.reunitem.io/",
        error: drawLightbox("databaseAlert"),
        success: function(data) {
            
        }
    }); 
}