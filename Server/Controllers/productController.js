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

    const sql = `INSERT INTO  products
        (ProductName, BatchNumber, ExpiryDate, StockQuantity, UnitPrice, ReorderLevel)
        values (?,?,?,?,?,?)`;

    db.query(sql,
        [ProductName, BatchNumber, ExpiryDate, StockQuantity, UnitPrice, ReorderLevel],
        (err, result) => {
            if (err) {
                console.log(err);
                res.send('Error inserting product');
            } else {
                res.send('Product added successfully');
            }
        }
    );
});
router.get('/:id', (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM products WHERE ProductID = ?";

    db.query(sql, [id], (err, result) => {
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