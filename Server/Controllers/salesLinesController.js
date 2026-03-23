// code for checking
// console.log("User Controller Loaded");
// 
const db = require('../Model/db');
const express = require('express');
const router = express.Router();
const LabelService = require('../labels/labelService');

//Return all users
router.get('/', (req, res) => {
    db.query('SELECT * FROM saleslines', (err, results) => {
        if (err) {
            console.log(err);
            res.send(LabelService.get('saleslines'));
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
        SalesOrderID,
       	ProductID,
        QuantitySold,
        UnitPriceAtSale,
        Discount,
    	LineTotal
    } = req.body;

    const sql = `INSERT INTO  saleslines
        (SalesOrderID,	ProductID, QuantitySold, UnitPriceAtSale, Discount, LineTotal)
        values (?,?,?,?,?,?)`;

    db.query(sql,
        [SalesOrderID,	ProductID, QuantitySold, UnitPriceAtSale, Discount, LineTotal],
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