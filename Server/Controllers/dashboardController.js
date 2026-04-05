const express = require('express');
const router = express.Router();
const db = require('../Model/db');

router.get('/employee-count', (req, res) => {

    const sql = "SELECT COUNT(*) AS total FROM employees WHERE IsActive = 1";

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
        WHERE CurrentStatusIN ('Available', 'Out for Delivery')
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