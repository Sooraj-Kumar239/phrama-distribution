// code for checking
// console.log("User Controller Loaded");
// 
const db = require('../Model/db');
const express = require('express');
const router = express.Router();
const LabelService = require('../labels/labelService');

//Return all users
router.get('/', (req, res) => {
    db.query('SELECT * FROM purchaseLines', (err, results) => {
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
        PurchaseOrderID,
        ProductID,
        QuantityOrdered,
        UnitCostAtPurchase,
        LineTotal
    } = req.body;

    const sql = `INSERT INTO  purchaseLines
        (PurchaseOrderID,ProductID,QuantityOrdered,UnitCostAtPurchase,LineTotal)
        values (?,?,?,?,?)`;

    db.query(sql,
        [PurchaseOrderID,ProductID,QuantityOrdered,UnitCostAtPurchase,LineTotal],
        (err, result) => {
            if (err) {
                console.log(err.message);
                res.send('Error inserting user' + err.message);
            } else {
                res.send('User added successfully');
            }
        }
    );

// update request
});


module.exports = router; 