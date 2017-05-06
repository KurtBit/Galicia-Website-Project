$(document).ready(function () {
    $(document).on('click', "[class^='js-btn-remove-']", function (event) {
        console.log(event);

        let $self = $(this);
        let id = $(this).attr('js-img-id');
        $.ajax({
            url: `/remove?id=${id}`,
            method: 'get',
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                $self.closest('tr').fadeOut(300, function () { $(this).remove(); });

                $('.js-collapse-trigger').trigger('click');
            }
        })
    })
})