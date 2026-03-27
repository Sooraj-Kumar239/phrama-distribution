// code for checking
// console.log("User Controller Loaded");
// 
const db = require('../Model/db');
const express = require('express');
const router = express.Router();
const LabelService = require('../labels/labelService');

//Return all users
router.get('/', (req, res) => {
    db.query('SELECT * FROM designations', (err, results) => {
        if (err) {
            console.log(err);
            res.send(LabelService.get('DESIGNATION_LIST'));
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
        	Title, BaseSalary } = req.body;

    const sql = `INSERT INTO  designations (Title,	BaseSalary) values (?,?)`;

    db.query(sql,
        [	Title,	BaseSalary],
        (err, result) => {
            if (err) {
                console.log(err.message);
                res.send('Error inserting Designation' + err.message);
            } else {
                res.send('Designation added successfully');
            }
        }
    );

// update request
                
});
                    router.get('/:id' , (req, res)=>{
                    // console.log("get designation by hit id");    
                    // const {id} = req.params;

                    const sql="SELECT * FROM designations WHERE DesignationId = ?";
                        db.query(sql, [req.params.id], (err, result) => {
                          if (err) return res.send(err);

                            res.json(result[0]);  
                     });
});
              
                    router.put('/:id', (req, res) => {
                    
                    const { Title, BaseSalary } = req.body;

                    const sql = `UPDATE designations SET Title=?, BaseSalary=? WHERE DesignationID = ?`;

                    db.query(sql, [Title, BaseSalary, req.params.id], (err, result) => {
                        if (err) {
                            console.log(err);
                           return res.status(500).send(err);
                        } else {
                            res.send("Designation updated successfully");
                        }
                    });
                });
                // for delete the record
                router.delete('/:id' , (req,res)=>{
                    // it will take id from URL
                    const id=req.params.id;  
                    
                    const sql="DELETE FROM designations WHERE DesignationID = ?";
                    db.query(sql,[id],(err,result)=>{
                        if (err) {
                            console.log(err);
                            return res.status(500).send("error deleting designation");
                        }
                        if (result.affectedRows === 0) {
                            return res.send("No record found with this ID");
                        }
                        res.send("Designation deleted successfully");
                    })
                })


module.exports = router; 