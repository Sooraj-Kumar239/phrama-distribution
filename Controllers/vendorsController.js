// code for checking
// console.log("User Controller Loaded");
// 
const db = require('../Model/db');
const express = require('express');
const router = express.Router();
const LabelService = require('../labels/labelService');

//Return all users
router.get('/', (req, res) => {
    db.query('SELECT * FROM vendors', (err, results) => {
        if (err) {
            console.log(err);
            res.send(LabelService.get('VENDORS_LIST'));
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
        VendorName,
        ContactPerson,
        LicenseNumber,
        Email,
        Address
    } = req.body;

    const sql = `INSERT INTO  vendors
        (VendorName,ContactPerson,LicenseNumber,Email,Address)
        values (?,?,?,?,?)`;

    db.query(sql,
        [VendorName,ContactPerson,LicenseNumber,Email,Address],
        (err, result) => {
            if (err) {
                console.log(err.message);
                res.send('Error inserting vendors' + err.message);
            } else {
                res.send('vendors added successfully');
            }
        }
    );

// update request
});


module.exports = router; 