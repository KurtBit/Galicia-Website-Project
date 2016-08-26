/// <reference path="../node_modules/jquery/dist/jquery.min.js" />

$.fn.gallery = function (col) {

  function getNextIndex(index) {
    index += 1;
    if (index > $imageContainers.length) {
      index = 1;
    }
    return index;
  }

  function getPrevIndex(index) {
    index -= 1;
    if (index < 1) {
      index = $imageContainers.length;
    }
    return index;
  }

  function getImgByIndexAttr(index) {
    return $imageContainers.children("[data-info='" + (index) + "']");
  }

  function switchSrcAndData(element1, element2) {
    element1.attr('src', element2.attr('src'));
    element1.data('info', element2.data('info'));

    return this;
  }

  col = col || 4;


  var $gallery = $(this);

  var $galleryList = $gallery.find('.gallery-list');
  var $imageContainers = $galleryList.children('.image-container');
  var $selected = $gallery.find('.selected');
  var $currentImg = $selected.find('#current-image');
  var $nextImg = $selected.find('#next-image');
  var $prevImg = $selected.find('#previous-image');

  resizeImages(col);
  
  function resizeImages(col) {
    $imageContainers.each(function (index, element) {
      $this = $(element);
      if ($this.hasClass('clearfix')) {
        $this.removeClass('clearfix');
      }
      if (index % col === 0) {
        $(element).addClass('clearfix');
      }
    })
  }

  $galleryList.on('click', 'img', function () {
    var $this = $(this);
    var $imgSrc = $this.attr('src');
    var $index = $this.data('info');

    $('<div />').addClass('disabled-background').appendTo($galleryList);

    var $next = $imageContainers.children("[data-info='" + ($index + 1) + "']");
    var $prev = $imageContainers.children("[data-info='" + ($index - 1) + "']");

    $currentImg.attr('src', $imgSrc);
    $currentImg.attr('data-info', $index);

    $nextImg.attr('src', $next.attr('src'));
    $nextImg.attr('data-info', $index + 1);

    $prevImg.attr('src', $prev.attr('src'));
    $prevImg.attr('data-info', $index - 1);

    $galleryList.addClass('blurred');

    $selected.show();
  })

  $currentImg.on('click', function () {
    $galleryList.removeClass('blurred');

    $selected.hide();

    $galleryList.children('.disabled-background').remove();
  })

  $nextImg.on('click', function () {
    var $this = $(this);
    var $index = $this.data('info');
    var $nextIndex = getNextIndex($index);
    var $next = getImgByIndexAttr($nextIndex);

    switchSrcAndData($prevImg, $currentImg);
    switchSrcAndData($currentImg, $this);
    switchSrcAndData($this, $next);

  })

  $prevImg.on('click', function () {
    var $this = $(this);
    var $index = $this.data('info');
    var $prevIndex = getPrevIndex($index);
    var $prev = getImgByIndexAttr($prevIndex);

    switchSrcAndData($nextImg, $currentImg);
    switchSrcAndData($currentImg, $this);
    switchSrcAndData($this, $prev);
  })

  function noScroll(x, y) {
    window.scrollTo(x, y)
  }

  $gallery.addClass('gallery');
  $selected.hide();

  return this;
};
