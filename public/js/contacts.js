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
                rangelength: [3, 15]
            },
            "contacts-email": {
                required: true,
                email: true
            },
            "contacts-phone": {
                required: true
            },
            "contacts-content": {
                required: true,
                rangelength: [10, 200]
            }
        },
        messages: {
            "contacts-name": {
                required: "Моля, въведете Вашето име.",
                rangelength: "Името трябва да съдържа между {0} и {1} символа."
            },
            "contacts-email": {
                required: "Моля, въведете Вашия е-мейл.",
                email: "Въведеният е-мейл не е валиден."
            },
            "contacts-phone": {
                required: "Моля, въведете Вашия телефон."
            },
            "contacts-content": {
                required: "Кажете ни, с какво можем да Ви бъдем полезни?",
                rangelength: "Текстът трябва да съдържа между {0} и {1} символа."
            }
        },
        errorPlacement: function(label, element) {
            label.addClass('error-message');
            label.insertAfter(element);
        },
        wrapper: 'span'
    })
})