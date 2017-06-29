const express = require('express');
const _ = require('lodash');

var router = express.Router();

function getMaxDaysInMonth(month, year) {
    return (new Date(month, year, 0).getDate());
}

router.get('/', function (req, res) {
    let date = new Date();
    let maxDaysInMonth = getMaxDaysInMonth(date.getMonth(), date.getMonth());

    let calendarCells = _.range(1, maxDaysInMonth, 1);

    res.render('calendar/main', { layout: false,
         cells: calendarCells });
})

module.exports = router;