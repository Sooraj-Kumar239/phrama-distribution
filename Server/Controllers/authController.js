const express = require('express');
const router = express.Router();
const db = require('../Model/db');

// LOGIN API
router.post('/login', (req, res) => {
    console.log("BODY:", req.body); 
    const { username, password } = req.body;

    const sql = "SELECT * FROM users WHERE Username = ?";

    db.query(sql, [username], (err, results) => {
        if (err){
            console.log("DB ERROR:", err);
            return res.status(500).send(err);
         }
        if (results.length === 0) {
            return res.json({ success: false });
        }

        const user = results[0];

        if (password !== user.PasswordH) {
            return res.json({ success: false });
        }

        //  success response
        res.json({
            success: true,
            user: {
                id: user.UserID,
                username: user.Username,
                role: user.role,
                 EmployeeID: user.EmployeeID
            }
        });
    });
});

module.exports = router;