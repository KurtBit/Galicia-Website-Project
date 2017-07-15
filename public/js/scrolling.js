$(document).ready(function () {
    const PADDING = 50;

    $('#js-scroll-to-about').on('click', function () {
        $('html, body').animate({
            scrollTop: $('#js-about').offset().top - PADDING
        }, 1000);
    })

    $('#js-scroll-to-gallery').on('click', function () {
        $('html, body').animate({
            scrollTop: $('#js-gallery').offset().top - PADDING
        }, 1000);
    })

    $('#js-scroll-to-services').on('click', function () {
        $('html, body').animate({
            scrollTop: $('#js-services').offset().top - PADDING
        }, 1000);
    })

    $('#js-scroll-to-courses').on('click', function () {
        $('html, body').animate({
            scrollTop: $('#js-courses').offset().top - PADDING
        }, 1000);
    })

    $('#js-scroll-to-contacts').on('click', function () {
        $('html, body').animate({
            scrollTop: $('#js-contacts').offset().top - PADDING
        }, 1000);
    })

    $('#js-scroll-to-map').on('click', function () {
        $('html, body').animate({
            scrollTop: $('#js-map').offset().top - PADDING
        }, 1000);
    })

    // js-about
    // js-gallery
    // js-services
    // js-courses
    // js-contacts
    // js-map
});