const express = require('express');
const _ = require('lodash');
const mongo = require('mongodb');
const Appointment = require('./appointment');

var router = express.Router();

// TODO(Domi): Create config file and store user and password in there!
const user = 'website';
const password = 'shamS6rmWM';

const db_appointments_table_name = 'appointments';

const url = `mongodb://${user}:${password}@ds064649.mlab.com:64649/galiciq_cms_db`

function getMaxDaysInMonth(month, year) {
    return (new Date(month, year, 0).getDate());
}

router.get('/', function (req, res) {
    mongo.connect(url, function(err, db){
        if (!db) {
            console.log(err);
            return;
        }
    })

    // TODO(Domi): Query Database
    
    let date = new Date();
    let maxDaysInMonth = getMaxDaysInMonth(date.getMonth(), date.getMonth());

    let calendarCells = _.range(1, maxDaysInMonth, 1);

    res.render('calendar/main', {
        layout: false,
        cells: calendarCells
    });
})

router.post('/add', function (req, res) {
    let appointment = new Appointment(
    req.body['name'],
    req.body['date'],
    req.body['comment'],
    req.body['time'],
    req.body['email']);

    mongo.connect(url, function (err, db) {
        if (!db) {
            console.log(err);
            return;
        }

        db.collection(db_appointments_table_name).insertOne(appointment, function (err, result) {
            if (err) {
                console.log(err);
            }
            db.close();
        })
    })
})

module.exports = router;