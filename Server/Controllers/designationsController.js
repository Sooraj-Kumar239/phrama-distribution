// code for checking
// console.log("User Controller Loaded");
// 
const db = require('../Model/db');
const express = require('express');
const router = express.Router();
const LabelService = require('../labels/labelService');

//Return all users
router.get('/', (req, res) => {
    db.query('SELECT * FROM designations', (err, results) => {
        if (err) {
            console.log(err);
            res.send(LabelService.get(' DESIGNATION_LIST'));
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
        	Title, BaseSalary } = req.body;

    const sql = `INSERT INTO  designations (Title,	BaseSalary) values (?,?)`;

    db.query(sql,
        [	Title,	BaseSalary],
        (err, result) => {
            if (err) {
                console.log(err.message);
                res.send('Error inserting Designation' + err.message);
            } else {
                res.send('Designation added successfully');
            }
        }
    );

// update request
});


module.exports = router; 