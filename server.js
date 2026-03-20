const express = require('express');
const app = express();
const db=require('./db') //server start and database will connectg


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

// Customers route
app.get('/customers', (req, res) => {
    res.send('Customers list');
});
