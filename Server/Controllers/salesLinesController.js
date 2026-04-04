// code for checking
// console.log("User Controller Loaded");

const db = require('../Model/db');
const express = require('express');
const router = express.Router();
const LabelService = require('../labels/labelService');

//Return all u
router.get("/sales-orders/:id", (req, res) => {
     const id = req.params.id;

   db.query(
        "SELECT * FROM salesorders WHERE SalesOrderID = ?",
        [id],
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error fetching sales order");
            }

            res.json(results[0]); // single object
        }
    );
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