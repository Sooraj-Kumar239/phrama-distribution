const db = require('../Model/db');
const express = require('express');
const router = express.Router();
const LabelService = require('../labels/labelService');

//Return all products
router.get('/', (req, res) => {
    db.query('SELECT * FROM employees', (err, results) => {
        if (err) {
            console.log(err);
            res.send(LabelService.get('EMPLOYEE_LIST'));
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
    DesignationID,
    FullName,
    Email,
    PhoneNumber,
    HireDate,
    Endate,
    IsActive
    } = req.body;

    const sql = `INSERT INTO  employees
        (DesignationID,FullName,Email,PhoneNumber,HireDate,Endate,IsActive)
        values (?,?,?,?,?,?,?)`;

    db.query(sql,
        [DesignationID,FullName,Email,PhoneNumber,HireDate,Endate,IsActive],
        (err, result) => {
            if (err) {
                console.log(err);
                res.send('Error inserting employss');
            } else {
                res.send('employee added successfully');
            }
        }
    );

// update request
});


module.exports = router; 