const express = require('express');
const _ = require('lodash');
const mongo = require('mongodb');
const Appointment = require('./appointment');
const moment = require('moment');

var router = express.Router();

// TODO(Domi): Create config file and store user and password in there!
const user = 'website';
const password = 'shamS6rmWM';

const tbl_appointments = 'appointments';

const url = `mongodb://${user}:${password}@ds064649.mlab.com:64649/galiciq_cms_db`

function getMaxDaysInMonth(month, year) {
    let date = new Date(year, (month), 0);

    return (date.getDate());
}

function toIsoDate(date) {
    var dateParts = date.split('.');

    if (dateParts[0].length == 1) {
        dateParts[0] = ('0' + dateParts[0]);
    }
    if (dateParts[1].length == 1) {
        dateParts[1] = ('0' + dateParts[1]);
    }

    var parsedDate = `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`;

    var output = new Date(parsedDate);

    return output;
}

router.get('/:month/:year', function (req, res) {
    mongo.connect(url, function (err, db) {
        if (!db) {
            console.log(err);
            return;
        }
        let date = new Date();
        const month = req.params.month;
        const year = req.params.year;

        let maxDaysInMonth = getMaxDaysInMonth(month, year);

        db.collection(tbl_appointments)
            .find({},
            function (err, result) {
                result.toArray().then(
                    (result) => {
                        let monthAppointments = _.filter(result, (x) => {
                            return (toIsoDate(x.date).getMonth() + 1) === month
                        });

                        let appointmentDates = [];
                        for (let i = 1; i <= maxDaysInMonth; i += 1) {
                            appointmentDates.push({
                                date: moment(toIsoDate(`${i}.${month}.${year}`)).format('DD.MM.YYYY'),
                                appointments: _.filter(monthAppointments, (x) => {
                                    return toIsoDate(x.date).getDate() === i
                                })
                            })
                        }

                        res.render('calendar/main', {
                            layout: false,
                            appointmentDates: appointmentDates
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