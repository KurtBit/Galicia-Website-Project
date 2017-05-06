const express = require('express');
const exphbs = require('express-handlebars');
const passport = require('passport');
const bodyParser = require('body-parser');
const images = require('./data/images.json');

require('./passport-init');

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
    res.render('home', { images: images });
});

var authRouter = require('./auth');
app.use(authRouter);

app.use(function (req, res, next) {
    if (req.isAuthenticated()) {
        next();

        return;
    }

    switch (req.url) {
        case '/show': {
            return;
        }
        default: {
            res.redirect('/login');
        }
    }
});

var adminRouter = require('./admin');
app.use(adminRouter);

app.listen(PORT, function () {
    console.log(`Starting service at ${ADDRESS} on port ${PORT}`);
})