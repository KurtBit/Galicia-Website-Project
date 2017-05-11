const express = require('express');
const path = require('path')
const fs = require('fs');
const fileExists = require('file-exists');
const _ = require('lodash');

var multer = require('multer');
var upload = multer({ dest: '/tmp/' });

var images = require(`${__dirname}/data/images.json`);
var ImageModel = require('./models/image');

var auth = require('./auth');

var router = express.Router();
module.exports = router;

const AREA_NAME = 'admin';

var session;

router.get('/', auth.isAuthenticated, function (req, res, next) {
    session = req.session;
    res.render('admin/main', {
        layout: 'admin'
    });
});

router.post('/add', upload.any(), function (req, res, next) {
    if (!session) {
        return res.sendStatus('401');
    }

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

            let name = fileName.replace(path.extname(fileName), "");
            let url = `img/${file.originalname}`;

            let image = new ImageModel(name, url);

            images.push(image);

            saveImages(images, res);
        });
    });
});

// TODO(Domi): Change query to param!
router.post('/remove', auth.isAuthenticated, function (req, res) {

    let image = _.find(images, x => x.Id == req.query.id);

    var serverPath = `${__dirname}/public/${image.Url}`;

    if (!fileExists.sync(serverPath)) {
        console.log(`File: ${path.basename(serverPath)} dosent exists!`);

        return res.sendStatus('200');
    }

    console.log(`File ${image.Url} was deleted!`);

    let index = images.indexOf(image);
    images.splice(index, 1);

    fs.unlink(serverPath, function (err) {
        if (err) {
            res.sendStatus('500');
            return next();
        }

        saveImages(images, res);
    });
});

router.get('/show', auth.isAuthenticated, function (req, res) {
    res.render('admin/show', {
        images: images,
        layout: false
    });
})

function saveImages(_images, res) {
    fs.writeFile(`${__dirname}/data/images.json`, JSON.stringify(_images), function (err) {
        if (err) {
            return res.sendStatus('500');
        }

        return res.sendStatus('200');
    });
}