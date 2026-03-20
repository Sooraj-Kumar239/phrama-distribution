const express = require('express');
const app = express();
const db=require('./db') //server start and database will connectg

app.use(express.json());//enable json body for post request


// Home route
app.get('/', (req, res) => {
    res.send('Pharma Distribution System Running...');
});

// Server start creting server on the browser
app.listen(3000, () => {
    console.log('Server running on port 3000');
});

// products route
app.get('/products', (req, res)=>{
    db.query('SELECT * FROM products' , (err, results)=>{
        if(err){
            console.log(err);
            res.send('error in fethching products');
             }
        else
            {
                res.json(results);
            }
    });
});

// post request
    app.post('/products',(req, res)=>{
        const{
            ProductName,
            BatchNumber,
            ExpiryDate,
            StockQuantity,
            UnitPrice,
            ReorderLevel
        } = req.body;

        const sql  =`INSERT INTO  products
        (ProductName, BatchNumber, ExpiryDate, StockQuantity, UnitPrice, ReorderLevel)
        values (?,?,?,?,?,?)`;

        db.query(sql,
            [ProductName,BatchNumber,ExpiryDate,StockQuantity,UnitPrice,ReorderLevel],
            (err,result)=>{
                if (err) {
                console.log(err);
                res.send('Error inserting product');
            } else {
                res.send('Product added successfully');
            }
            }
        );
    });
// Customers route
app.get('/customers', (req, res) => {
    res.send('Customers list');
});
