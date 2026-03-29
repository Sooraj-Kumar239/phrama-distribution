const db = require('../Model/db');
const express = require('express');
const router = express.Router();
const LabelService = require('../labels/labelService');

//Return all customer
router.get('/', (req, res) => {
    db.query('SELECT * FROM customers', (err, results) => {
        if (err) {
            console.log(err);
            res.send(LabelService.get('CUSTOMER_LIST'));
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
        CustomerName,
        ContactPerson,
        Phone,
        Email,
        Address,
        CustomerType
    } = req.body;

    const sql = `INSERT INTO customers
        (CustomerName,ContactPerson,Phone,Email,Address,CustomerType)
        values (?,?,?,?,?,?)`;

    db.query(sql,
        [CustomerName,ContactPerson,Phone,Email,Address,CustomerType],
        (err, result) => {
            if (err) {
                console.log(err);
                res.send('Error inserting customers');
            } else {
                res.send('Customer added successfully');
            }
        }
    );

// update request
});


module.exports = router; 