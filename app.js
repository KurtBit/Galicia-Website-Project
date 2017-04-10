const express = require('express');
const exphbs = require('express-handlebars');
const fs = require('fs');
var path = require('path')

var app = express();

const PORT = 3000;
const ADDRESS = '127.0.0.1';

// ViewEngine
app.engine('handlebars', exphbs(
    {
        defaultLayout: 'main'
    })
);
// app.set('views', './views');
app.set('view engine', 'handlebars');

// Static content
app.use(express.static('./public'));
app.use(express.static('node_modules/jquery/dist'));
app.use(express.static('node_modules/jquery-validation/dist'));
app.use(express.static('node_modules/bootstrap/dist'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/admin', function (req, res) {
    fs.readdir('./public/img/', function (err, list) {
        if (err) {
            done(err);
        }
        var images = list.filter(file => path.extname(file) === '.jpg');

        res.render('admin', { images });
    });
});

app.listen(PORT, function () {
    console.log(`Starting service at ${ADDRESS} on port ${PORT}`);
})