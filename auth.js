const express = require('express');
const passport = require('passport');

var usersDb = require('./data/users.json')

var router = express.Router();
module.exports = {
    router,
    isAuthenticated
};

router.get('/login', function (req, res) {
    res.render('login', { layout: 'admin-area' });
});

router.post('/login', function (req, res) {
    if (!req.body.username || !req.body.password) {
        res.render('login',
            { message: "Please enter both id and password" });
    }

    var isLoggedIn = false;
    usersDb.filter(function (user) {
        if (user.name === req.body.username &&
            user.password === req.body.password) {

            req.session.user = user;
            isLoggedIn = true;
        }
    });

    if (isLoggedIn) {
        res.redirect('/admin');
    } else {
        res.render('login',
            { message: "Invalid credentials!" });
    }
});


router.get('/logout', function (req, res) {
    req.session.destroy(function () {
        console.log("user logged out.")
    });
    res.redirect('/login');
});

function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();     //If session exists, proceed to page
    } else {
        var err = new Error("Not logged in!");
        console.log(req.session.user);
        next(err);  //Error, trying to access unauthorized page!
    }
}