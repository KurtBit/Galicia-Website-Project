var express = require('express');
var session = require('express-session');
var exphbs = require('express-handlebars');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var imagesDb = require('./data/images.json');

var app = express();

//Set up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Set up cookie parser
app.use(cookieParser());
app.use(session({ secret: "Keyboard Doge FTW" }));

//Set up default view engine
app.engine('handlebars',
    exphbs({
        defaultLayout: 'home',
        helpers: require('./helpers/handlebars').helpers
    }));

//Set up views location
app.set('views', './views');
app.set('view engine', 'handlebars');

//Set up static content
app.use(express.static('./public'));
app.use(express.static('node_modules/jquery/dist'));
app.use(express.static('node_modules/jquery-validation/dist'));
app.use(express.static('node_modules/bootstrap/dist'));

app.use('/', require('./home'));

//TODO(Domi): Extract helper function!
app.use('/auth', require('./auth').router);

app.use('/admin', require('./admin'));
app.use('/callendar', require('./callendar'));

// Configure server
const PORT = 3000;
const ADDRESS = '127.0.0.1';

app.listen(PORT, function () {
    console.log(`Starting service at ${ADDRESS} on port ${PORT}`);
})