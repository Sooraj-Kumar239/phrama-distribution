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
           return res.status(500).json({ error: "Error fetching employees" });
        } else {
            // res.json(results);
            return res.json(results);
        }
    });
});
    
      // 2: Get SINGLE employee (for edit page)
    router.get('/:id', (req, res) => {
        const id = req.params.id;

        db.query(
            "SELECT * FROM employees WHERE EmployeeID = ?",
            [id],
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: "Error fetching employees" });
                }
                // res.json(result);
                // res.json(result[0]);
                return res.json(result[0]);
            }
        );
    });
    
    
    // 3: add/Inserts request
    router.post('/', (req, res) => {
        const { DesignationID, FullName, Email, PhoneNumber, HireDate, EndDate, IsActive} = req.body;

        const sql = `INSERT INTO  employees
            (DesignationID,FullName,Email,PhoneNumber,HireDate,EndDate,IsActive)
            values (?,?,?,?,?,?,?)`;

        db.query(sql,
            [DesignationID,FullName,Email,PhoneNumber,HireDate,EndDate,IsActive ? Number(IsActive) : 0],
            (err, result) => {
                if (err) {
                    // console.log("SQL ERROR:", err.sqlMessage);
                    // res.json('Error inserting employss');
                    console.log("SQL ERROR:", err.sqlMessage);
                    return res.status(500).json({ error: err.sqlMessage });
                } else {
                   return res.json({ message: "Employee added successfully" });
                }
            }
        )
    }); 

     // 4:  update request /employe
                
                    router.put('/:id', (req, res) => {
                            console.log("BODY DATA:", req.body); 
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
                                    // res.json('Error updating employee');
                                    console.log("SQL ERROR:", err.sqlMessage);
                                    return res.status(500).json({ error: err.sqlMessage });
                                } else {
                                    // res.json('Employee updated successfully');
                                      return res.json({ message: "Employee updated successfully" });
                                }
                            }
                        );
                    });

                    // 5: delete employee
                router.delete('/:id', (req, res) => {
                const id = req.params.id;

                db.query('DELETE FROM employees WHERE EmployeeID = ?', [id], (err, result) => {
                if (err) {
                            console.log(err);
                            return res.status(500).json({ error: err.sqlMessage });
                        }
                        else {
                                 return res.json({ message: "Employee deleted successfully" });
                             }
                });
                });
               






      


                

                


module.exports = router; 