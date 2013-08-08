window.fbAsyncInit = function() {
    //Initialise the FB JS SDK
    FB.init({
        appId      : '165247903660300',
        channelUrl : '//reunitem.io',
        status     : true,
        xfbml      : false
    });

    //Tests the user's login status and asks them to login if necessary
    FB.Event.subscribe('auth.authResponseChange', function(response) {
        if (response.status === 'connected') {
            testAPI();
        }
        else if (response.status === 'not_authorized') {
            FB.login();
        }
        else {
            FB.login();
        }
    });
};

//Load the SDK asynchronously
(function(d){
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));

function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
        console.log('Good to see you, ' + response.name + '.');
    });
}