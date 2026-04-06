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

//Return single user
router.get('/:UserId', (req, res) => {

    const UserId = req.params.UserId;
    
    db.query(
     `SELECT U1.*, E1 FROM USERS U1
        JOIN EMPLOYEES E1 ON E1.EmployeeID = U1.EmployeeID
         WHERE U1.USERID = ?`,
        [UserId],
        (err, results) => {
            if (err) return res.send(err);
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
        role
    } = req.body;

    const sql = `INSERT INTO  users
        (EmployeeID, Username, PasswordH, role)
        values (?,?,?,?)`;

    db.query(sql,
        [EmployeeID, username, PasswordH, role],
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