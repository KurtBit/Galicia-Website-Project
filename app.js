const express = require('express');
const exphbs = require('express-handlebars');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
require('./passport-init');
var images = require('./data/images.json');

var multer = require('multer');
var upload = multer({ dest: '/tmp/' });

var app = express();

const PORT = 3000;
const ADDRESS = '127.0.0.1';

// ViewEngine
app.engine('handlebars', exphbs({ defaultLayout: 'main-area' }));
app.set('views', './views');
app.set('view engine', 'handlebars');

// Static content
app.use(express.static('./public'));
app.use(express.static('node_modules/jquery/dist'));
app.use(express.static('node_modules/jquery-validation/dist'));
app.use(express.static('node_modules/bootstrap/dist'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('express-session')({
    secret: 'keyboard cat', resave: false, saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', function (req, res) {
    res.render('home');
});

var authRouter = require('./auth');
app.use(authRouter);

app.use(function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
        return;
    }

    res.redirect('/login');
});

var adminRouter = require('./admin');
app.use(adminRouter);

// TODO(Domi): Remove from app.js!
app.post('/admin', upload.any(), function (req, res) {
    var file = req.files[0];

    var fileName = file.originalname;

    images.push({
        name: fileName.replace(path.extname(fileName), ""),
        path: "img/" + file.originalname
    })

    fs.readFile(file.path, function (err, data) {
        if (err) {
            res.sendStatus('500');
            return next();
        }
        var newPath = "../public/img/" + file.originalname;
        fs.writeFile(newPath, data);
    });

    res.sendStatus('200');
});

app.listen(PORT, function () {
    console.log(`Starting service at ${ADDRESS} on port ${PORT}`);
})