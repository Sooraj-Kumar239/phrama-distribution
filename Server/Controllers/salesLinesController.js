const db = require('../Model/db');
const express = require('express');
const router = express.Router();
const LabelService = require('../labels/labelService');

//Return all u
router.get("/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM saleslines WHERE SalesOrderID = ?";

   db.query(sql, [id],(err, results) => {
            if (err) {
                console.error("GET Error:", err);
                return res.status(500).send("Error fetching sales order");
            }

            res.json(results || []); // single object
            // res.json(results);
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
    	
    } = req.body;

    const sql = `INSERT INTO  saleslines
        (SalesOrderID,	ProductID, QuantitySold, UnitPriceAtSale, Discount)
        values (?,?,?,?,?)`;

    db.query(sql,
        [SalesOrderID,	ProductID, QuantitySold, UnitPriceAtSale, Discount],
        (err, result) => {
            if (err) {
                console.log(err.message);
               return res.status(500).json({ error: 'Error inserting line: ' + err.message });
            } 
            
                res.json({
                    message: "Line added successfully",
                    insertId: result.insertId
                });
                
        }
    );

});

// update request
router.put('/:lineId', (req, res) => {

    const lineId = req.params.lineId;
    const { ProductID, QuantitySold, UnitPriceAtSale, Discount } = req.body;

    const sql = `UPDATE saleslines 
            SET ProductID=?, QuantitySold=?, UnitPriceAtSale=?, Discount=?
            WHERE SLineID=?`;
            
      
            db.query(sql, [ProductID, QuantitySold, UnitPriceAtSale, Discount, lineId],
            
            (err, result) => {

            if (err){
                console.error("PUT Error:", err);
                return res.status(500).json({ error: err.message });
            }
                res.json({ message: "Updated successfully", lineId });
        }
    );
});

module.exports = router; 