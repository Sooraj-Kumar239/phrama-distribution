// const console.log("SERVER FILE checking");
const LabelService              = require('./labels/labelService');
// server port
const PORT = process.env.PORT || 3003;
const cors                      = require("cors");
const express                   = require('express');
const path = require('path');
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


// dashboard
const dashboardRoutes = require('./Controllers/dashboardController');

const app = express();

// checking host db
app.get('/test-db', (req, res) => {
  db.query("SHOW TABLES", (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});


// 

app.use(cors());
// app.use(express.json());
app.use(express.json());//enable json body for post request
//Add controller
app.use('/products', productController);
app.use('/customers', customerController);
//Home route
// app.get('/', (req, res) => {
//     res.send(LabelService.get('HOME_ROUTE'));
// });
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
app.use('/sales-lines', salesLinesController);
// salesOrder
app.use('/sales-orders', salesOrdersController);
// vehicles
app.use('/vehicles' , vehiclesController);
// const vendors
app.use('/vendors', vendorsController);
// dashboard/hoempage
// app.use('/dashboard', dashboardRoutes);
app.use('/api/dashboard', dashboardRoutes);
//Start creting server on the browser

// temprary
    // Serve React build
app.use(express.static(path.join(__dirname, 'public')));
//  trying tos et both port for loccalhost and  azzure product




  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
