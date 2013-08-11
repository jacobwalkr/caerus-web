function login() {
    var email = $("#email").val();
    var password = $("#password").val();
    $.post(
        "http://api.reunitem.io/users/login",
        '{"email":"'+email+'","password":"'+password+'"}'
    );
    removeLightbox("loginLightbox");
    var loggedInAs = "You are logged in as " + email;
    $.ajax({
        url: "http://api.reunitem.io/users/login",
        error: drawLightbox("databaseAlert"),
        success: function(data) {
            window.user = email;
        }
    });
}