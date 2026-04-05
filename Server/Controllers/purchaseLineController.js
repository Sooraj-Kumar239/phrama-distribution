// code for checking
// console.log("User Controller Loaded");
// 
const db = require('../Model/db');
const express = require('express');
const router = express.Router();
const LabelService = require('../labels/labelService');

//Return all users
router.get('/:orderId', (req, res) => {

    const orderId = req.params.orderId;
    
    db.query(
     `SELECT pl.*, p.ProductName 
         FROM purchaseLines pl
         JOIN products p ON pl.ProductID = p.ProductID
         WHERE pl.PurchaseOrderID = ?`,
        [orderId],
        (err, results) => {
            if (err) return res.send(err);
            res.json(results);
        }
    );
       
});

//Inserts request
router.post('/', (req, res) => {
    const {
        PurchaseOrderID,
        ProductID,
        QuantityOrdered,
        UnitCostAtPurchase,
        // LineTotal
    } = req.body;

    // calculate here
    const LineTotal = QuantityOrdered * UnitCostAtPurchase;

    db.query( `INSERT INTO  purchaseLines
        (PurchaseOrderID, ProductID, QuantityOrdered, UnitCostAtPurchase, LineTotal)
        values (?, ?, ?, ?, ?)`,
        [PurchaseOrderID,ProductID,QuantityOrdered,UnitCostAtPurchase,LineTotal],
        
        (err, result) => {
            if(err) return res.send(err);


            //  UPDATE TOTAL
            db.query(
                `UPDATE purchaseorders 
                 SET TotalCost = (
                    SELECT SUM(LineTotal) 
                    FROM purchaseLines 
                    WHERE PurchaseOrderID = ?
                 )
                 WHERE PurchaseOrderID = ?`,
                [PurchaseOrderID, PurchaseOrderID],
                (err2) => {

                    if (err2) return res.send(err2);

                    res.send('Line added & Total updated');
                }
            );
        }
    );

});


// update request

router.put('/:lineId', (req, res) => {

    const lineId = req.params.lineId;
    const { ProductID, QuantityOrdered, UnitCostAtPurchase } = req.body;

    const LineTotal = QuantityOrdered * UnitCostAtPurchase;

    db.query(
      `UPDATE purchaseLines 
       SET ProductID=?, QuantityOrdered=?, UnitCostAtPurchase=?, LineTotal=? 
       WHERE PLineID=?`,
      [ProductID, QuantityOrdered, UnitCostAtPurchase, LineTotal, lineId],
      (err) => {

        if (err) return res.send(err);

         res.json({message: lineId });
      }
    );
});

module.exports = router; 