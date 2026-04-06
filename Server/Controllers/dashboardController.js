const express = require('express');
const router = express.Router();
const db = require('../Model/db');

router.get('/product-count', (req, res) => {
    const sql = "SELECT COUNT(*) AS total FROM purchaseorders WHERE OrderStatus IN ('Received')";

    db.query(sql, (err,result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({error:"database error"});
        }
        return res.json({
            activeProducts: result[0].total
        });
    })
});

// all sale products who's payment or delivery not confrmed
    router.get('/sale-count', (req, res) => {
    const sql= `SELECT COUNT(*) AS total
        FROM salesorders
        WHERE 
        (DeliveryStatus IS NULL OR DeliveryStatus != 'Delivered')
        AND 
        (PaymentStatus IS NULL OR PaymentStatus != 'Paid')`;

            db.query(sql, (err, result) => {
                if (err) {
                console.log(err);
                return res.status(500).json({ error: "Database Error" });
            }
            return res.json({
                activeSaleOrder: result[0].total
        });
    });
});
// 
router.get('/employee-count', (req, res) => {

    const sql = `SELECT COUNT(*) AS total FROM employees WHERE IsActive = 1`;

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Database Error" });
        }

        return res.json({
            activeEmployees: result[0].total
        });
    });
});


// acvtie vehicles

router.get('/vehicle-count', (req, res) => {

    const sql = `
        SELECT COUNT(*) AS total 
        FROM vehicles 
        WHERE CurrentStatus IN ('Available', 'Out for Delivery')
    `;

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Database Error" });
        }

        return res.json({
            activeVehicles: result[0].total
        });
    });
});
// end acvtie vehicles

module.exports = router;