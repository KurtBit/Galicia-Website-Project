$(document).ready(function () {
    if ($('.js-collapse-trigger').length) {
        $('.js-collapse-trigger').on('click', function () {
            $.ajax({
                url: '/show',
                method: 'get',
                xhrFields: {
                    withCredentials: true
                },
                success: function (data) {
                    $('.js-galery-images-collapsible-body').html('');

                    $('.js-galery-images-collapsible-body').append(data).show('slow');
                }
            })
        })

        $('.js-collapse-trigger').trigger('click');
    }
})