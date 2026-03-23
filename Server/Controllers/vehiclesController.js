// code for checking
// console.log("User Controller Loaded");
// 
const db = require('../Model/db');
const express = require('express');
const router = express.Router();
const LabelService = require('../labels/labelService');

//Return all users
router.get('/', (req, res) => {
    db.query('SELECT * FROM vehicles', (err, results) => {
        if (err) {
            console.log(err);
            res.send(LabelService.get('VEHIVLES_LIST'));
            // res.send(LabelService.get('CUSTOMER_LIST'));
        }
        else {
            res.json(results);
        }
    });
});

//Inserts request
router.post('/', (req, res) => {
    const {
        PlateNumber,
        Model,
        VehicleType,
        CurrentStatus
    } = req.body;

    const sql = `INSERT INTO  vehicles
        (PlateNumber, Model, VehicleType,CurrentStatus)
        values (?,?,?,?)`;

    db.query(sql,
        [lateNumber, Model, VehicleType,CurrentStatus],
        (err, result) => {
            if (err) {
                console.log(err.message);
                res.send('Error inserting vehicles' + err.message);
            } else {
                res.send('vehicles added successfully');
            }
        }
    );

// update request
});


module.exports = router; 