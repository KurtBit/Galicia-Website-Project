var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

var passport = require('passport');
var session = require('express-session');

var images = require('./data/images.json');

require('./passport-init');

var app = express();

//Set up default view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main-area' }));
app.set('views', './views');
app.set('view engine', 'handlebars');

//Set up static content
app.use(express.static('./public'));
app.use(express.static('node_modules/jquery/dist'));
app.use(express.static('node_modules/jquery-validation/dist'));
app.use(express.static('node_modules/bootstrap/dist'));

//Set up body parser
app.use(bodyParser.urlencoded({ extended: true }));

//Set up passport local authentication
app.use(session({ secret: 'keyboard cat' }));
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
            next();
            return;
        }
        default: {
            res.redirect('/login');
        }
    }
});

var adminRouter = require('./admin');
app.use(adminRouter);

// Configure server
const PORT = 3000;
const ADDRESS = '127.0.0.1';

app.listen(PORT, function () {
    console.log(`Starting service at ${ADDRESS} on port ${PORT}`);
})