    const db = require('../Model/db');
    const express = require('express');
    const router = express.Router();
    const LabelService = require('../labels/labelService');

    //Return all users
    router.get('/', (req, res) => {
        db.query('SELECT * FROM users', (err, results) => {
            if (err) {
                console.log(err);
                res.send(LabelService.get('USER_LIST'));
                // res.send(LabelService.get('CUSTOMER_LIST'));
            }
            else {  
                res.json(results);
            }
        });
    });

    //Return single user
    router.get('/:UserId', (req, res) => {

        const UserId = req.params.UserId;
        
        db.query(
        `SELECT U1.*, E1.FullName 
            FROM users U1
            JOIN employees E1 ON E1.EmployeeID = U1.EmployeeID
            WHERE U1.UserID = ?`,
            [UserId],
            (err, results) => {
                if (err) {
                    console.log(err);
                return res.status(500).send(err);
                }
                res.json(results);
            }
        );
        
    });

    //Inserts request
    router.post('/', (req, res) => {
        
        const {
            EmployeeID,
            username,
            PasswordH,
            // role
        } = req.body;

        const sql = `INSERT INTO  users
            (EmployeeID, Username, PasswordH )
            values (?,?,?)`;

        db.query(sql,
            [EmployeeID, username, PasswordH] ,
            (err, result) => {
                if (err) {
                    console.log(err.message);
                    res.send('Error inserting user' + err.message);
                } else {
                    res.json({ success: true, message: "User added successfully" });
                }
            }
        );
    });

    // update api
        router.put('/:id', (req, res) => {
        const { EmployeeID, username, PasswordH,  } = req.body;

        const sql = `
            UPDATE users
            SET EmployeeID = ?, Username = ?, PasswordH = ?
            WHERE UserID = ?
        `;

        db.query(sql, [EmployeeID, username, PasswordH, req.params.id],
            (err, result) => {
                if (err) {
                    console.log("UPDATE ERROR:", err);
                    return res.status(500).send("Error updating user");
                }

                res.send("User updated successfully");
            }
        );
    });

    // delete API
        router.delete('/:id', (req, res) => {
        db.query(
            "DELETE FROM users WHERE UserID = ?",
            [req.params.id],
            (err, result) => {
                if (err) {
                    console.log("DELETE ERROR:", err);
                    return res.status(500).send("Error deleting user");
                }

                res.send("User deleted successfully");
            }
        );
    });
        

    module.exports = router; 