$(document).ready(function () {
    const PADDING = 50;

    $('#bs-example-navbar-collapse-1 > ul > li:nth-child(1) > a').on('click', function() {
        $('html body').animate({scrollTop: $('.js-jumbotron').offset().top - PADDING}, 1000);
    })

    $('#bs-example-navbar-collapse-1 > ul > li:nth-child(2) > a').on('click', function() {
        $('html body').animate({scrollTop: $('.js-about').offset().top - PADDING}, 1000) ;
    })

     $('#bs-example-navbar-collapse-1 > ul > li:nth-child(3) > a').on('click', function() {
        $('html body').animate({scrollTop: $('.js-gallery').offset().top - PADDING}, 1000);
    })

    $('#bs-example-navbar-collapse-1 > ul > li:nth-child(4) > a').on('click', function() {
        $('html body').animate({scrollTop: $('.js-services').offset().top - PADDING}, 1000);
    })

    $('#bs-example-navbar-collapse-1 > ul > li:nth-child(5) > a').on('click', function() {
        $('html body').animate({scrollTop: $('.js-collaborators').offset().top - PADDING}, 1000);
    })

    $('#bs-example-navbar-collapse-1 > ul > li:nth-child(6) > a').on('click', function() {
        $('html body').animate({scrollTop: $('.js-contacts').offset().top - PADDING}, 1000);
    })

    $('#bs-example-navbar-collapse-1 > ul > li:nth-child(7) > a').on('click', function() {
        $('html body').animate({scrollTop: $('.js-map').offset().top - PADDING}, 1000);
    })

    // js-about
    // js-gallery
    // js-services
    // js-collaborators
    // js-contacts
    // js-map
});