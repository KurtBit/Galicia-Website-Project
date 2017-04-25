 $(document).ready(function () {
            const SCALE_FACTOR = 4;

            var $images = $("[id^='js-img-']");

            if ($images.length) {
                $images.on('mouseover', function (event) {
                    var $target = $(event.target);

                    var id = $target.attr('id');
                    var imgPreviewId = 'js-img-preview-' + id.substring(17);

                    $('<img>')
                        .attr('src', $target.attr('src'))
                        .attr('id', imgPreviewId)
                        .css({
                            "position": "absolute",
                            "left": $target.position().left - $target.width(),
                            "top": $target.position().top - $target.height(),
                            "width": $target.width() * SCALE_FACTOR,
                            "height": $target.height() * SCALE_FACTOR,
                            "border-radius": "5px"
                        }).appendTo($target.parent());
                });
            };

            $('.img-preview-container').on('mouseleave', function (event) {
                $previewImage = $("[id^='js-img-preview-']");
                if ($previewImage) {
                    $previewImage.remove();
                }
            });
        });