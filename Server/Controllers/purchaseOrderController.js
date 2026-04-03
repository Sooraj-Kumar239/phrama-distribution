const express = require('express');
const router = express.Router();
const db = require('../Model/db');
// console.log(" Purchase Order Controller Loaded");


// GET  all
router.get('/', (req, res) => {

    const query = `
        SELECT po.*, v.VendorName, e.FullName 
        FROM purchaseorders po
        LEFT JOIN vendors v ON po.VendorID = v.VendorID
        LEFT JOIN employees e ON po.EmployeeID = e.EmployeeID
        ORDER BY po.PurchaseOrderID DESC
    `;

    db.query(query, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});


// GET SINGLE EDIT PAGE KE LIYE

router.get('/:id', (req, res) => {

    const { id } = req.params;

    const query = `
        SELECT 
            PurchaseOrderID,
            OrderName,
            VendorID,
            EmployeeID,
            TotalCost,
            OrderStatus
            FROM purchaseorders
            WHERE PurchaseOrderID = ?
    `;

    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).send(err);

        if (result.length === 0) {
            return res.status(404).json({ message: "Not Found" });
        }

        res.json(result[0]); // 
    });
});



// Add

router.post('/', (req, res) => {

    const {OrderName, VendorID, EmployeeID, TotalCost, OrderStatus } = req.body;

    db.query(
        "INSERT INTO purchaseorders (OrderName, VendorID, EmployeeID, TotalCost, OrderStatus) VALUES (?, ?, ?, 0.00, ?)",
        [OrderName ,VendorID, EmployeeID, TotalCost, OrderStatus],
        (err, result) => {

            if (err) return res.status(500).send(err);

            res.json({
                message: "Added Successfully",
                id: result.insertId
            });
        }
    );
});


//  UPDATE  EDIT SAVE
router.put('/:id', (req, res) => {

    const { id } = req.params;
    const {OrderName, VendorID, EmployeeID, TotalCost, OrderStatus } = req.body;

    db.query(
        "UPDATE purchaseorders SET OrderName=?, VendorID=?, EmployeeID=?, TotalCost=?, OrderStatus=? WHERE PurchaseOrderID=?",
        [OrderName,VendorID, EmployeeID, TotalCost, OrderStatus, id],
        (err, result) => {

            if (err) return res.status(500).send(err);

            res.json({ message: "Updated Successfully" });
        }
    );
});



//  DELETE

router.delete('/:id', (req, res) => {

    const { id } = req.params;

    db.query(
        "DELETE FROM purchaseorders WHERE PurchaseOrderID = ?",
        [id],
        (err, result) => {

            if (err) return res.status(500).send(err);

            res.json({ message: "Deleted Successfully" });
        }
    );
});

module.exports = router;