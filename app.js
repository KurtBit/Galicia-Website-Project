var express = require('express');
var session = require('express-session');
var exphbs = require('express-handlebars');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var _ = require('lodash');

var imagesDb = require('./data/images.json');

var app = express();

//Set up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Set up cookie parser
app.use(cookieParser());
app.use(session({ secret: "Keyboard Doge FTW" }));

//Set up default view engine
app.engine('handlebars', exphbs({ defaultLayout: 'home' }));

//Set up views location
app.set('views', './views');
app.set('view engine', 'handlebars');

//Set up static content
app.use(express.static('./public'));
app.use(express.static('node_modules/jquery/dist'));
app.use(express.static('node_modules/jquery-validation/dist'));
app.use(express.static('node_modules/bootstrap/dist'));

const maxImageCount = 12;

app.get('/', function (req, res) {
    var pagesCount = Math.round(imagesDb.length / maxImageCount);

    var pages = new Array(pagesCount);

    for (var i = 0; i < pagesCount; i++) {
        pages.push(i + 1);
    }

    res.render('home/main', { images: imagesDb, pages: pages });
});

app.get('/show/:index', function (req, res) {
    var index = req.params.index - 1;

    var startIndex = index * maxImageCount;

    var filteredImages = _.take(_.drop(imagesDb, startIndex), maxImageCount);

    res.render('home/gallery', { layout: false, images: filteredImages });
})

//TODO(Domi): Extract to helper function!
var authRouter = require('./auth');
app.use(authRouter.router);

var adminRouter = require('./admin');
app.use(adminRouter);

// Configure server
const PORT = 3000;
const ADDRESS = '127.0.0.1';

app.listen(PORT, function () {
    console.log(`Starting service at ${ADDRESS} on port ${PORT}`);
})