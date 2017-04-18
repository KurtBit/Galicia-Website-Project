const express = require('express');

var router = express.Router();
module.exports = router;

router.get('/admin', function (req, res) {
    fs.readdir('./public/img/', function (err, list) {
        if (err) {
            done(err);
        }
        var images = list.filter(file => path.extname(file) === '.jpg');

        res.render('admin', {
            images: images,
            layout: 'admin-area'
        });
    });
});