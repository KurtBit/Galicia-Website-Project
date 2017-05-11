var express = require('express');
var _ = require('lodash');

var imagesDb = require('./data/images.json');

var router = express.Router();
module.exports = router;

const maxImageCount = 12;

router.get('/', function (req, res, next) {
    var pagesCount = Math.round(imagesDb.length / maxImageCount);

    var pages = new Array(pagesCount);

    for (var i = 0; i < pagesCount; i++) {
        pages.push(i + 1);
    }

    res.render('home/main', { images: imagesDb, pages: pages });
});

router.get('/show/:index', function (req, res, next) {
    var index = req.params.index - 1;

    var startIndex = index * maxImageCount;

    var filteredImages = _.take(_.drop(imagesDb, startIndex), maxImageCount);

    res.render('home/gallery', { layout: false, images: filteredImages });
})