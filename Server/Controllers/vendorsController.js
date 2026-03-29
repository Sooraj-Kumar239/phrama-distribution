const db = require('../Model/db');
const express = require('express');
const router = express.Router();
const LabelService = require('../labels/labelService');

//get  all users
router.get('/', (req, res) => {
    db.query('SELECT * FROM vendors', (err, results) => {
        if (err) {
            console.log(err);
            res.send(LabelService.get('VENDORS_LIST'));
            
        }
        else {
            res.json(results);
        }
    });
});

    //Inserts request
    router.post('/', (req, res) => {
        const {
            VendorName,
            ContactPerson,
            LicenseNumber,
            Email,
            Address
    } = req.body;

    const sql = `INSERT INTO  vendors
        (VendorName,ContactPerson,LicenseNumber,Email,Address)
        values (?,?,?,?,?)`;

        db.query(sql,
            [VendorName,ContactPerson,LicenseNumber,Email,Address],
            (err, result) => {
                if (err) {
                    console.log(err.message);
                    res.send('Error inserting vendors' + err.message);
                } else {
                res.send('vendors added successfully');
            }
        }
    );
});
        // get vendor by ID
            router.get('/:id' , (req, res) => {
                const id = req.params.id;
                const sql = "select * from vendors where  VendorID = ?";
                
                db.query(sql, [id], (err,result) => {
                    if (err) {
                        console.log(err);
                            res.send("error in fetching vendor");
                        }
                        else{
                            res.json(result[0]);
                        }
                    
                });
            })
            //  update vendor request
            router.put('/:id',(req,res) => {
            const id = req.params.id;

            const {
                VendorName,
                ContactPerson,
                LicenseNumber,
                Email,
                Address
            } = req.body;

        const sql = `
        UPDATE vendors 
        SET VendorName=?, ContactPerson=?, LicenseNumber=?, Email=?, Address=?  WHERE VendorID=?`;

        db.query( sql,
        [VendorName, ContactPerson, LicenseNumber, Email, Address, id],
        
        (err, result) => {
            if (err) {
                console.log(err);
                res.send("Error updating vendor");
            } 
            else {
                res.json({message: "distributor updated"});
            }
        }
        
    );
    });

    // delete vendors
    router.delete('/:id', (req, res) => {
    const id = req.params.id;

    db.query(
        "DELETE FROM vendors WHERE VendorID=?",
        [id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.send("Error deleting vendor");
            } else {
                res.json({ message: "Vendor deleted successfully" });
            }
        }
    );
    });



module.exports = router; 