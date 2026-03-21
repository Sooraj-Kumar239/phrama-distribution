const express = require('express');
//server start and database will connectg
const db = require('./Model/db');
const productController = require('./Controllers/productController');
const customerController = require('./Controllers/customerController');
const LabelService = require('./labels/labelService');

const app = express();
app.use(express.json());//enable json body for post request

//Add controller
app.use('/products', productController);
app.use('/customer', customerController);

//Home route
app.get('/', (req, res) => {
    res.send(LabelService.get('HOME_ROUTE'));
});

//Start creting server on the browser
app.listen(LabelService.get('PORT'), () => {
    console.log(`${LabelService.get('SERVER_START')}: ${LabelService.get('PORT')}`);
});
