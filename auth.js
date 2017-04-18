const express = require('express');
const passport = require('passport');

var router = express.Router();
module.exports = router;

router.get('/login', function (req, res) {
    res.render('login', { layout: 'admin-area' });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/login'
}));

router.get('/logout', function(req, res){
    req.logOut();
    res.redirect('/login');
});
