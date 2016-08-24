console.log('brb');
$(document).ready(function () {
    $('#bs-example-navbar-collapse-1 > ul > li:nth-child(1) > a').on('click', function() {
        $('html body').animate({scrollTop: $('.js-home').offset().top}, 1000);
    })

    $('#bs-example-navbar-collapse-1 > ul > li:nth-child(2) > a').on('click', function() {
        $('html body').animate({scrollTop: $('.js-about').offset().top}, 1000);
    })

     $('#bs-example-navbar-collapse-1 > ul > li:nth-child(3) > a').on('click', function() {
        $('html body').animate({scrollTop: $('.js-gallery').offset().top}, 1000);
    })

    $('#bs-example-navbar-collapse-1 > ul > li:nth-child(4) > a').on('click', function() {
        $('html body').animate({scrollTop: $('.js-services').offset().top}, 1000);
    })

    $('#bs-example-navbar-collapse-1 > ul > li:nth-child(5) > a').on('click', function() {
        $('html body').animate({scrollTop: $('.js-collaborators').offset().top}, 1000);
    })

    $('#bs-example-navbar-collapse-1 > ul > li:nth-child(6) > a').on('click', function() {
        $('html body').animate({scrollTop: $('.js-contacts').offset().top}, 1000);
    })

    // js-about
    // js-gallery
    // js-services
    // js-collaborators
    // js-contacts

});