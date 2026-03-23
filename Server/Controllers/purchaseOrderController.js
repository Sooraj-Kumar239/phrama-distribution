// code for checking
// console.log("User Controller Loaded");
// 
const db = require('../Model/db');
const express = require('express');
const router = express.Router();
const LabelService = require('../labels/labelService');

//Return all users
router.get('/', (req, res) => {
    db.query('SELECT * FROM purchaseorders', (err, results) => {
        if (err) {
            console.log(err);
            res.send(LabelService.get('PURCHASElINE_LIST'));
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
        VendorID	,
        EmployeeID,
        OrderDate,
        TotalCost,
        OrderStatus
    } = req.body;

    const sql = `INSERT INTO  purchaseorders
        ( VendorID, EmployeeID, OrderDate, TotalCost, OrderStatus)
        values (?,?,?,?,?)`;

    db.query(sql,
        [VendorID, EmployeeID, OrderDate, TotalCost, OrderStatus],
        (err, result) => {
            if (err) {
                console.log(err.message);
                res.send('Error inserting purchase order' + err.message);
            } else {
                res.send('purchase order added successfully');
            }
        }
    );

// update request
});


module.exports = router; 