$(document).ready(function () {
    $('#js-pagination-container').on('click', 'a', function () {
        let $this = $(this);

        let index = $this.attr('id')
            .split('-')
            .pop();

        $('.active').removeClass('active');

        $(`[data-slide-number=${index}]`).addClass('active');
    });
})