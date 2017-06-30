const express = require('express');
const _ = require('lodash');
const mongo = require('mongodb');
const Appointment = require('./appointment');

var router = express.Router();

// TODO(Domi): Create config file and store user and password in there!
const user = 'website';
const password = 'shamS6rmWM';

const tbl_appointments = 'appointments';

const url = `mongodb://${user}:${password}@ds064649.mlab.com:64649/galiciq_cms_db`

function getMaxDaysInMonth(month, year) {
    return (new Date(month, year, 0).getDate());
}

function toIsoDate(date) {
    var dateParts = date.split('.');

    var parsedDate = `${dateParts[1]}.${dateParts[0]}.${dateParts[2]}`;

    var output = new Date(parsedDate);

    return output;
}

router.get('/', function (req, res) {
    mongo.connect(url, function (err, db) {
        if (!db) {
            console.log(err);
            return;
        }
        let date = new Date();
        const month = date.getMonth();
        const year = date.getFullYear();

        let maxDaysInMonth = getMaxDaysInMonth(month, year);

        db.collection(tbl_appointments)
            .find({},
                function (err, result) {
                    result.toArray().then(
                        (result) => {
                            let calendarCells = _.range(1, maxDaysInMonth, 1);
                        
                            res.render('calendar/main', {
                                layout: false,
                                cells: calendarCells,
                                appointments: _.find(result, (x) => {
                                    toIsoDate(x.date).getMonth() === month
                                })
                            });
                        }
                    )
                })
    })
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

        db.collection(tbl_appointments).insertOne(appointment, function (err, result) {
            if (err) {
                console.log(err);
            }
            db.close();
        })
    })
})

module.exports = router;