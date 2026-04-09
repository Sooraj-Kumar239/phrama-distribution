const sql = require('../Model/db');
const express = require('express');
const router = express.Router();
const LabelService = require('../labels/labelService');

//Return all products
router.get('/',async (req, res) => {
    try{
            const result = await sql.query('SELECT * FROM products');
            res.json(result.recordset);
        }
        catch (err) {
           console.log(err);
            res.status(500).send("Error fetching products");
        }
    // db.query('SELECT * FROM products', (err, results) => {
    //     if (err) {
    //         console.log(err);
    //         res.send(LabelService.get('PRODUCT_LIST'));
    //         // res.send(LabelService.get('CUSTOMER_LIST'));
    //     }
    //     else {
    //         res.json(results);
    //     }
    // });
});

//Inserts request
router.post('/',async (req, res) => {
    const {
        ProductName,
        BatchNumber,
        ExpiryDate,
        StockQuantity,
        UnitPrice,
        ReorderLevel
    } = req.body;

     try {
        await sql.query (`INSERT INTO  products
        (ProductName, BatchNumber, ExpiryDate, StockQuantity, UnitPrice, ReorderLevel)
        values ('${ProductName}', '${BatchNumber}', '${ExpiryDate}', ${StockQuantity}, ${UnitPrice}, ${ReorderLevel})
        `);
         res.send("Product added successfully");
        }
        catch (err) {
                console.log(err);
                res.status(500).send("Error inserting product");
        }
    
    });

    // GET SINGLE PRODUCT
router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const result = await sql.query(`SELECT * FROM products WHERE ProductID = ${id}`);
        res.json(result.recordset[0]);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching product");
    }
});

// UPDATE PRODUCT
router.put('/:id', async (req, res) => {
    const id = req.params.id;

    const {
        ProductName,
        BatchNumber,
        ExpiryDate,
        StockQuantity,
        UnitPrice,
        ReorderLevel
    } = req.body;

    try {
        await sql.query(`
            UPDATE products SET 
            ProductName='${ProductName}',
            BatchNumber='${BatchNumber}',
            ExpiryDate='${ExpiryDate}',
            StockQuantity=${StockQuantity},
            UnitPrice=${UnitPrice},
            ReorderLevel=${ReorderLevel}
            WHERE ProductID=${id}
        `);

        res.send("Updated successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error updating");
    }
});

// DELETE PRODUCT
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        await sql.query(`DELETE FROM products WHERE ProductID = ${id}`);
        res.send("Deleted successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error deleting");
    }
});

module.exports = router;
    // singel data  
//     router.get('/:id', (req, res) => {
//     const id = req.params.id;

//     const sql = "SELECT * FROM products WHERE ProductID = ?";

//     db.query(sql, [id], (err, result) => {
//         if (err) {
//             console.log(err);
//             res.send("Error fetching product");
//         } else {
//             res.json(result[0]); // 👈 important
//         }
//     });
// });
// // edit requestr
//                router.put('/:id', (req, res) => {
//     const id = req.params.id;

//     const {
//         ProductName,
//         BatchNumber,
//         ExpiryDate,
//         StockQuantity,
//         UnitPrice,
//         ReorderLevel
//     } = req.body;

//     db.query(
//         "UPDATE products SET ProductName=?, BatchNumber=?, ExpiryDate=?, StockQuantity=?, UnitPrice=?, ReorderLevel=? WHERE ProductID=?",
//         [ProductName, BatchNumber, ExpiryDate, StockQuantity, UnitPrice, ReorderLevel, id],
//         (err, result) => {
//             if (err) {
//                 console.log(err);
//                 res.send("Error updating");
//             } else {
//                 res.send("Updated successfully");
//             }
//         }
//     );
// });
// // delete request

// router.delete('/:id', (req, res) => {
//     const id = req.params.id;
//     console.log("DELETE API HIT", id);

//     const sql = "DELETE FROM products WHERE ProductID = ?";
    
//     db.query(sql, [id], (err, result) => {
//         if (err) {
//             console.log(err);
//             res.send("Error deleting product");
//         } else {
//             res.send("Product Deleted Successfully");
//         }
//     });
// });


module.exports = router; 