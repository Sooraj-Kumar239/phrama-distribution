// const console.log("SERVER FILE checking");
const cors                      = require("cors");
const express                   = require('express');
// const app                        = express();
// auth controleer
const authController = require('./Controllers/authController');

//server start and database will connectg
const db                        = require('./Model/db');
const productController         = require('./Controllers/productController');
const customerController        = require('./Controllers/customerController');
const userController            = require('./Controllers/userController');
const designationsController    = require('./Controllers/designationsController');
const employeesController       = require('./Controllers/employeesController');
const purchaseLineController    = require('./Controllers/purchaseLineController');
const purchaseOrderController   = require('./Controllers/purchaseOrderController');
const salesLinesController      = require('./Controllers/salesLinesController');
const salesOrdersController     = require('./Controllers/salesOrdersController');
const vehiclesController        = require('./Controllers/vehiclesController');
const vendorsController         = require('./Controllers/vendorsController');
const LabelService              = require('./labels/labelService');
// dashboard
const dashboardRoutes = require('./Controllers/dashboardController');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.json());//enable json body for post request
//Add controller
app.use('/products', productController);
app.use('/customers', customerController);
//Home route
app.get('/', (req, res) => {
    res.send(LabelService.get('HOME_ROUTE'));
});
// user
app.use('/users', userController);
// auth
app.use('/auth', authController);
//designation
app.use('/designation', designationsController);
// employees
app.use('/employees', employeesController);
// purchaseLine
app.use('/purchaselines', purchaseLineController);
// purchase order
app.use('/purchase-orders', purchaseOrderController);
// sales LinesAC
app.use('/saleslines', salesLinesController);
// salesOrder
app.use('/salesorder', salesOrdersController);
// vehicles
app.use('/vehicles' , vehiclesController);
// const vendors
app.use('/vendors', vendorsController);
// dashboard/hoempage
app.use('/dashboard', dashboardRoutes);
//Start creting server on the browser

// temprary
    
// 
app.listen(LabelService.get('PORT'), () => {
    console.log(`${LabelService.get('SERVER_START')}: ${LabelService.get('PORT')}`);
});
