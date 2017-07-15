  $(document).ready(function () {
            $('#js-pagination').on('click', 'a', function () {
                var $self = $(this);

                var url = '\show\/' + $self.text();
                $.ajax({
                    url: url,
                    success: function (data) {
                        var $container = $('#js-pagination-container');
                        $container.html('');

                        $container.append(data);

                        $('li.active').removeClass('active');

                        $self.parent().addClass('active');

                        $('#myCarousel')
                            .find('img')
                            .css('max-height',
                            $('#js-slider-thumbs')
                                .height())
                    }
                })
            })
        })