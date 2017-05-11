const express = require('express');
const passport = require('passport');

var usersDb = require('./data/users.json')

var router = express.Router();
module.exports = {
    router,
    isAuthenticated
};

router.get('/auth/login', function (req, res) {
    res.render('auth/login', { layout: false });
});

router.post('/auth/login', function (req, res) {
    if (!req.body.username || !req.body.password) {
        res.render('auth/login',
            { message: "Please enter both id and password", layout: false });
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
        // TODO(Domi): Render error message!
        res.render('auth/login',
            { message: "Invalid credentials!", layout: false });
    }
});

router.get('/auth/logout', function (req, res) {
    req.session.destroy(function () {
        console.log("user logged out.")
    });
    res.redirect('auth/login');
});

function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();     //If session exists, proceed to page
    } else {
        console.log("Not logged in!");

        res.redirect("auth/login");
    }
}