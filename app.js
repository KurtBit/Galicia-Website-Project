const express = require('express');

var app = express();

const PORT = 3000;
const ADDRESS = '127.0.0.1';

app.use(express.static('./public'));

app.use(express.static('node_modules/jquery/dist'));
app.use(express.static('node_modules/jquery-validation/dist'));
app.use(express.static('node_modules/font-awesome'));
app.use(express.static('node_modules/bootstrap/dist'));
app.use(express.static('node_modules/bootstrap-social'));

app.get('/', function(req, res){
    res.render('./public/index.html');
});

app.listen(PORT, function(){
    console.log(`Starting service at ${ADDRESS} on port ${PORT}`);
})