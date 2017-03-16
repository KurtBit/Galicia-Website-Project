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

    //Form Validation
    $("#contact-form").validate({
        rules: {
            "contacts-name": {
                required: true,
                rangelenght: [3, 10]
            },
            "contacts-email": {
                required: true,
                email: true
            },
            "contacts-phone": {
                required: true
            },
            "contacts-form-content": {
                required: true,
                rangelenght: [10, 200]          
            }
        },
        messages: {
            "contacts-name": {
                required: "Your user name is required!",
                rangelenght: "Your name must be between {0} and {1} characters long!"
            },
            "contacts-email": {
                required: "Your email is required!",
                email: "You will have to enter a valid email!"
            },
            "contacts-phone": {
                required: "Your telephone number is required!"
            },
            "contacts-form-content": {
                required: "Please state how can we help you?",
                rangelenght: "Please enter text between {0} and {1} charaters long."          
            }
        }
    })
})