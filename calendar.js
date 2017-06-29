const express = require('express');
const _ = require('lodash');
const mongo = require('mongodb');

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
    let date = new Date();
    let maxDaysInMonth = getMaxDaysInMonth(date.getMonth(), date.getMonth());

    let appointment = {
        name: 'Ivan',
        date: '01.02.2016',
        comment: 'Бърза Прическа',
        time: '13:00'
    }

    mongo.connect(url, function(err, db){
        if(!db){
            console.log(err);
            return;
        }
        db.collection(db_appointments_table_name).insertOne(appointment, function(err, result){
            if(err){
               console.log(err);
            }

            db.close();
        })
    })

    let calendarCells = _.range(1, maxDaysInMonth, 1);

    res.render('calendar/main', { layout: false,
         cells: calendarCells });
})

module.exports = router;