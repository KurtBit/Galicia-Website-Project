const express = require('express');
const path = require('path')
var images = require('./data/images.json');

var router = express.Router();
module.exports = router;

router.get('/admin', function (req, res) {
    res.render('admin', {
        images: images,
        layout: 'admin-area'
    });
});

// router.post('/admin', function (req, res) {
//     res.sendStatus(200);
// });