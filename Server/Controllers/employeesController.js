const db = require('../Model/db');
const express = require('express');
const router = express.Router();
const LabelService = require('../labels/labelService');

//Return all employee
router.get('/', (req, res) => {

    const sql = `
        SELECT 
            e.*, 
            d.Title AS DesignationName
            FROM employees e
            LEFT JOIN designations d 
            ON e.DesignationID = d.DesignationID`;

    db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            res.send("Error fetching employees");
        } else {
            res.json(results);
        }
    });
});

//Inserts request
router.post('/', (req, res) => {
    const { DesignationID, FullName, Email, PhoneNumber, HireDate, EndDate, IsActive} = req.body;

    const sql = `INSERT INTO  employees
        (DesignationID,FullName,Email,PhoneNumber,HireDate,EndDate,IsActive)
        values (?,?,?,?,?,?,?)`;

    db.query(sql,
        [DesignationID,FullName,Email,PhoneNumber,HireDate,EndDate,Number(IsActive)],
        (err, result) => {
            if (err) {
                console.log("SQL ERROR:", err.sqlMessage);
                res.send('Error inserting employss');
            } else {
                res.send('employee added successfully');
            }
        }
    )
});
// delete employee
                router.delete('/:id', (req, res) => {
                const id = req.params.id;

                db.query('DELETE FROM employees WHERE EmployeeID = ?', [id], (err, result) => {
                if (err) {
                            console.log(err);
                            res.send('Error deleting employee');
                        }
                        else {
                                res.send('Employee deleted successfully');
                             }
                });
                });
// update request
                // ✅ UPDATE employee (optional but important)
                    router.put('/:id', (req, res) => {
                        const id = req.params.id;

                        const {
                            FullName,
                            Email,
                            PhoneNumber,
                            DesignationID,
                            HireDate,
                            EndDate,
                            IsActive
                        } = req.body;

                        const sql = `
                            UPDATE employees 
                            SET FullName=?, Email=?, PhoneNumber=?, DesignationID=?, HireDate=?, EndDate=?, IsActive=?
                            WHERE EmployeeID=?
                        `;

                        db.query(sql,
                            [FullName, Email, PhoneNumber, DesignationID, HireDate, EndDate, IsActive, id],
                            (err, result) => {
                                if (err) {
                                    console.log(err);
                                    res.send('Error updating employee');
                                } else {
                                    res.send('Employee updated successfully');
                                }
                            }
                        );
                    });

                


module.exports = router; 