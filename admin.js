const express = require('express');
const path = require('path')
var images = require('./data/images.json');
const fs = require('fs');
var multer = require('multer');
var upload = multer({ dest: '/tmp/' });
const fileExists = require('file-exists');

var router = express.Router();
module.exports = router;

router.get('/admin', function (req, res) {
    res.render('admin', {
        images: images,
        layout: 'admin-area'
    });
});

router.post('/add', upload.any(), function (req, res) {
    var file = req.files[0];

    var fileName = file.originalname;
    var newPath = `${__dirname}/public/img/${fileName}`;

    if (fileExists.sync(newPath)) {
        console.log(`File: ${path.basename(newPath)} already exists!`);

        return res.sendStatus('200');
    }

    fs.readFile(file.path, function (err, data) {
        if (err) {
            res.sendStatus('500');
            return next();
        }

        fs.writeFile(newPath, data, function (err) {
            if (err) {
                res.sendStatus('500');
                return next();
            }

            console.log(`File ${fileName} was successfuly saved to: ${newPath}`);
        });
    });

    images.push({
        name: fileName.replace(path.extname(fileName), ""),
        path: "img/" + file.originalname
    });

    fs.writeFile(`${__dirname}/data/images.json`, JSON.stringify(images), function (err) {
        if (err) {
            res.sendStatus('500');
            return next();
        }

        return res.sendStatus('200');
    });
});

router.post('/remove', function (req, res) {
    // fs.unlink(item, function (err) {
    //     if (err) throw err;
    //     console.log(item + " deleted");
    // });
});

