// code for checking
// console.log("User Controller Loaded");
// 
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

//Inserts request
router.post('/', (req, res) => {
    const {
        EmployeeID,
        Username,
        PasswordH
    } = req.body;

    const sql = `INSERT INTO  users
        (EmployeeID, Username, PasswordH)
        values (?,?,?)`;

    db.query(sql,
        [EmployeeID, Username, PasswordH],
        (err, result) => {
            if (err) {
                console.log(err.message);
                res.send('Error inserting user' + err.message);
            } else {
                res.send('User added successfully');
            }
        }
    );

// update request
});


module.exports = router; 