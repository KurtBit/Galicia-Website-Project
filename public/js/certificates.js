$(document).ready(function () {
    var $certificateCarousel = $('#js-certificate-carousel');

    $('.certificate').on('click', function (event) {
        $certificateCarousel.attr('src',
            $(this).attr('src'));
        $certificateCarousel.attr('alt',
            $(this).attr('alt'));
    })
})