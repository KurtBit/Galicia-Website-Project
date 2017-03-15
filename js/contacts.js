/// <reference path="../node_modules/jquery/dist/jquery.min.js" />

// For reference -> https://www.emailjs.com/
$(document).ready(function () {
    var userId = "user_8nEuGApJXaemlaFkYpa2v";
    emailjs.init(userId);

    $('#contact-form').on('submit', function () {
        var values = $(this).serializeArray();

        var name = values[0].value;
        var email = values[1].value;
        var phone = values[2].value;
        var message = values[3].value;

        emailjs.send(
            "gmail",
            "template",
            {
                "from_name": name,
                "from_email": email,
                "from_phone": phone,
                "message": message
            }).then(function (response) {
                console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
            }, function (err) {
                console.log("FAILED. error=", err);
            })

        return false;
    });
})