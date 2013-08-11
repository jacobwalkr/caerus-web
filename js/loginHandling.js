function login() {
    var email = $.("#email").val();
    var password = $.("#password").val();
    $.post(
        "http://api.reunitem.io/users/login",
        '{"email":"'+email'","password":"'+password+'"}'
    )
    var loggedInAs = "You are logged in as " + email;
    $.ajax({
        dataType: "jsonp",
        mimeType: "application/javascript",
        url: "http://api.reunitem.io/",
        error: drawLightbox("databaseAlert"),
        success: function(data) {
            if (data == ) {
                drawLightbox("successfulLogin");
                var successMessage = "<p class='successMessage'>You have been successfully logged in.</p>";
                $(successMessages).append("#successfulLogin");
                $(".buttonLogon").remove();
                $(loggedInAs).append(header);
            }
            else if (data == ) {
                drawLightbox("successfulRegistration")
                var successMessage = "<p class='successMessage'>Your account has been successfully created and you are now logged in.</p>";
                $(successMessage).append("#successfulRegistration");
                $(".buttonLogon").remove();
                $(loggedInAs).append(header);
            }
            else if (data == ) {
                drawLightbox("unsuccessfulLogin")
                var failureMessage = "<p class='failureMessage'>An account with that email exists, but the password you provided does not match.</p>";
                $(failureMessage).append("#unsuccessfulLogin");
            }
        }
    }); 
}