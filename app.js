const express = require('express');
const exphbs = require('express-handlebars');

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
// app.use(express.static('node_modules/font-awesome'));
app.use(express.static('node_modules/bootstrap/dist'));
// app.use(express.static('node_modules/bootstrap-social'));

app.get('/', function (req, res) {
    res.render('home');
});

app.listen(PORT, function () {
    console.log(`Starting service at ${ADDRESS} on port ${PORT}`);
})