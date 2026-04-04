// code for checking
// console.log("User Controller Loaded");
// 
const db = require('../Model/db');
const express = require('express');
const router = express.Router();
const LabelService = require('../labels/labelService');

//Return all users
router.get('/', (req, res) => {
    db.query('SELECT * FROM salesorders', (err, results) => {
        if (err) {
            console.log(err);
            res.send(LabelService.get('salesorders'));
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
        CustomerID,
        EmployeeID,
        VehicleID,
        OrderDate,
        TotalAmount,
        DeliveryStatus,
        PaymentStatus
    } = req.body;

    const sql = `INSERT INTO  salesorders
        (CustomerID,EmployeeID,VehicleID,OrderDate,TotalAmount,DeliveryStatus,PaymentStatus)
        values (?,?,?,?,?,?,?)`;

    db.query(sql,
        [CustomerID,EmployeeID,VehicleID,OrderDate,TotalAmount,DeliveryStatus,PaymentStatus],
        (err, result) => {
            if (err) {
                console.log(err.message);
                res.send('Error inserting sles order' + err.message);
            } else {
                     return res.json({
                        success: true,
                       message: "Sales order added successfully"
                        });
            }
        }
    );

// update request
});


module.exports = router; 