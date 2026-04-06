// code for checking
// console.log("User Controller Loaded");

const db = require('../Model/db');
const express = require('express');
const router = express.Router();
const LabelService = require('../labels/labelService');

//Return all u
router.get("/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM SalesLines WHERE SalesOrderID = ?";

   db.query(sql, [id],(err, results) => {
            if (err) {
                return res.status(500).json(err);
                return res.json(result);
                // return res.status(500).send("Error fetching sales order");
            }

            // res.json(results[0]); // single object
            res.json(results);
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

    const sql = `INSERT INTO  SalesLines
        (SalesOrderID,	ProductID, QuantitySold, UnitPriceAtSale, Discount, LineTotal)
        values (?,?,?,?,?,?)`;

    db.query(sql,
        [SalesOrderID,	ProductID, QuantitySold, UnitPriceAtSale, Discount, LineTotal],
        (err, result) => {
            if (err) {
                console.log(err.message);
                res.send('Error inserting user' + err.message);
            } else {
                res.json({
                    message: "Line added successfully",
                    insertId: result.insertId
                    });
                }
        }
    );

});

// update request
router.put('/:lineId', (req, res) => {

    const lineId = req.params.lineId;
    const { SLineID, SalesOrderID, ProductID, QuantitySold, UnitPriceAtSale, Discount, LineTotal } = req.body;

    db.query(
     `UPDATE SALESLINES 
             SET ProductID=?, QuantitySold=?, UnitPriceAtSale=?, Discount=?, LineTotal=? 
             WHERE SLineID=? AND SalesOrderID=?`,
      [ProductID, QuantitySold, UnitPriceAtSale, Discount, LineTotal, SLineID, SalesOrderID],
      (err) => {

        if (err) return res.send(err);

         res.json({message: lineId });
      }
    );
});

module.exports = router; 