const db = require('../Model/db');
const express = require('express');
const router = express.Router();
const LabelService = require('../labels/labelService');

//Return all products
router.get('/', (req, res) => {
   
        db.query('SELECT * FROM products', (err, results) => {
        if (err) {
            console.log(err);
            res.send(LabelService.get('PRODUCT_LIST'));
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
        ProductName,
        BatchNumber,
        ExpiryDate,
        StockQuantity,
        UnitPrice,
        ReorderLevel
    } = req.body;

      const query = `
        INSERT INTO products
        (ProductName, BatchNumber, ExpiryDate, StockQuantity, UnitPrice, ReorderLevel)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [ProductName, BatchNumber, ExpiryDate, StockQuantity, UnitPrice, ReorderLevel], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error inserting product");
        }
        res.send("Product added successfully");
    });
    
    });

//     // GET SINGLE PRODUCT
// router.get('/:id', async (req, res) => {
//     const id = req.params.id;

//     try {
//         const result = await sql.query(`SELECT * FROM products WHERE ProductID = ${id}`);
//         res.json(result.recordset[0]);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send("Error fetching product");
//     }
// });




    // singel data  
    router.get('/:id', (req, res) => {
    const id = req.params.id;

    const query = "SELECT * FROM products WHERE ProductID = ?";

    db.query(query, [id], (err, result) => {
        if (err) {
            console.log(err);
            res.send("Error fetching product");
        } else {
            res.json(result[0]); // 👈 important
        }
    });
});
// edit requestr
               router.put('/:id', (req, res) => {
    const id = req.params.id;

    const {
        ProductName,
        BatchNumber,
        ExpiryDate,
        StockQuantity,
        UnitPrice,
        ReorderLevel
    } = req.body;

    db.query(
        "UPDATE products SET ProductName=?, BatchNumber=?, ExpiryDate=?, StockQuantity=?, UnitPrice=?, ReorderLevel=? WHERE ProductID=?",
        [ProductName, BatchNumber, ExpiryDate, StockQuantity, UnitPrice, ReorderLevel, id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.send("Error updating");
            } else {
                res.send("Updated successfully");
            }
        }
    );
});
// delete request

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    console.log("DELETE API HIT", id);

    const sql = "DELETE FROM products WHERE ProductID = ?";
    
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err);
            res.send("Error deleting product");
        } else {
            res.send("Product Deleted Successfully");
        }
    });
});


module.exports = router; 