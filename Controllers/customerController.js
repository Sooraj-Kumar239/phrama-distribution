const db = require('../Model/db');
const express = require('express');
const router = express.Router();
const LabelService = require('../labels/labelService');

// Customers route
router.get('/', (req, res) => {
    res.send(LabelService.get('CUSTOMER_LIST'));
});


module.exports = router; 