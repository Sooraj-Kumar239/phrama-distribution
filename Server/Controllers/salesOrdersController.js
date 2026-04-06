const db = require('../Model/db');
const express = require('express');
const router = express.Router();
const LabelService = require('../labels/labelService');

//Return all  Path: /sales-orders
router.get('/', (req, res) => {

    const query = `
        SELECT so.*, c.CustomerName, v.PlateNumber, e.FullName
        FROM salesorders so
        LEFT JOIN customers c ON so.CustomerID = c.CustomerID
        LEFT JOIN vehicles v ON so.VehicleID = v.VehicleID
        LEFT JOIN employees e ON so.EmployeeID = e.EmployeeID
        ORDER BY so.SalesOrderID DESC
    `;

    db.query(query, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});
// single data 

router.get('/:id', (req, res) => {

    const { id } = req.params;

    const query = `SELECT  * from salesorders WHERE SalesOrderID = ?`;
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).send(err);

        if (result.length === 0) {
            return res.status(404).json({ message: "Not Found" });
        }

        res.json(result[0]);
    });
});

//Inserts request
router.post('/', (req, res) => {
    const {CustomerID, EmployeeID, VehicleID, OrderDate, TotalAmount, DeliveryStatus, PaymentStatus} = req.body;

    const sql = `INSERT INTO  salesorders (CustomerID,EmployeeID,VehicleID,OrderDate,TotalAmount,DeliveryStatus,PaymentStatus)
        values (?,?,?,?,?,?,?)`;

    db.query(sql, [CustomerID, EmployeeID, VehicleID, OrderDate, TotalAmount, DeliveryStatus, PaymentStatus],
        (err, result) => {
            if (err) {
                return res.status(500).send(err.message);
                res.send('Error inserting sles order' + err.message);
            } else {
                        return res.json({
                        success: true,
                       message: "Sales order added successfully"
                        });
                    }
        }
    );

});
// UPDATE
router.put('/:id', (req, res) => {

    const { id } = req.params;

    const {CustomerID, EmployeeID, VehicleID, TotalAmount, DeliveryStatus, PaymentStatus} = req.body;
    const sql=`UPDATE salesorders SET CustomerID=?, EmployeeID=?, VehicleID=?, TotalAmount=?, DeliveryStatus=?, PaymentStatus=? 
        WHERE SalesOrderID=?`;
        db.query(sql, [CustomerID, EmployeeID, VehicleID, TotalAmount, DeliveryStatus, PaymentStatus, id],
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
        "DELETE FROM salesorders WHERE SalesOrderID = ?",
        [id],
        (err, result) => {

            if (err) return res.status(500).send(err);

            res.json({ message: "Deleted Successfully" });
        }
    );
});

module.exports = router;