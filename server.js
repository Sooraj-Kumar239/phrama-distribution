const express = require('express');
const app = express();

// Home route
app.get('/', (req, res) => {
    res.send('Pharma Distribution System Running...');
});

// Server start creting server on the browser
app.listen(3000, () => {
    console.log('Server running on port 3000');
});