
const db = require('../Model/db');
const express = require('express');
const router = express.Router();
const LabelService = require('../labels/labelService');

//Return all users for specific order
router.get('/:orderId', (req, res) => {
    const orderId = req.params.orderId;
    
    const sql= ` SELECT pl.*, p.ProductName 
            FROM purchaselines pl
            LEFT JOIN products p ON pl.ProductID = p.ProductID
            WHERE pl.PurchaseOrderID = ?`;
        
        db.query(sql, [orderId], (err, results) => {
            if (err){
                console.error("Database GET Error:", err);
                return res.status(500).json(err);
            } 
            res.json(results || []);
        });
    });

//Inserts request lines
router.post('/', (req, res) => {
    const {
        PurchaseOrderID,
        ProductID,
        QuantityOrdered,
        UnitCostAtPurchase
        // LineTotal
    } = req.body;

    // calculate here
    // const LineTotal = QuantityOrdered * UnitCostAtPurchase;

    const insertSql = `
        INSERT INTO  purchaselines
        (PurchaseOrderID, ProductID, QuantityOrdered, UnitCostAtPurchase)
        values (?, ?, ?, ?)`;

        db.query(insertSql, [PurchaseOrderID, ProductID, QuantityOrdered, UnitCostAtPurchase],
        
        (err, result) => {
            if(err){
                console.error("Insert Error:", err);
                return res.status(500).json(err);
            }

            //  UPDATE TOTALCost in purchase Order 
            
                const updateTotalSql =`UPDATE purchaseorders 
                    SET TotalCost = (
                    SELECT COALESCE(SUM(LineTotal),0) FROM purchaselines WHERE PurchaseOrderID = ?)
                    WHERE PurchaseOrderID = ?`;

                db.query(updateTotalSql, [PurchaseOrderID, PurchaseOrderID],
                    (err2) => {
                    if (err2){
                        console.error("Update Order Total Error:", err2);
                        return res.status(500).json(err2);
                    }
                res.json({ message: 'Line added successfully', id: result.insertId });
            });
        });
    });
// update request

router.put('/:lineId', (req, res) => {
    const lineId = req.params.lineId;

    const {PurchaseOrderID, ProductID, QuantityOrdered, UnitCostAtPurchase } = req.body;

    // const LineTotal = QuantityOrdered * UnitCostAtPurchase;

    const updateSql = `
      UPDATE purchaselines 
       SET ProductID=?, QuantityOrdered=?, UnitCostAtPurchase=?
       WHERE PLineID=?`;

      db.query(updateSql, [ ProductID, QuantityOrdered, UnitCostAtPurchase, lineId],
      (err) => {
            if (err) {
            console.error("Update Error:", err);
            return res.status(500).json(err);
        }
        const updateTotalSql = `
            UPDATE purchaseorders 
            SET TotalCost = (SELECT COALESCE(SUM(LineTotal), 0) FROM purchaselines WHERE PurchaseOrderID = ?)
            WHERE PurchaseOrderID = ?`;

        db.query(updateTotalSql, [PurchaseOrderID, PurchaseOrderID], (err2) => {
            if (err2) {
                console.error("Update Total After Edit Error:", err2);
                return res.status(500).json(err2);
            }
        res.json({ message: "Updated successfully", lineId });
    });
});
});

module.exports = router; 