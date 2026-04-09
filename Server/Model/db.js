const mysql = require('mysql2');

// Database connection create
const db = mysql.createConnection({
    
   
        host: 'metro.proxy.rlwy.net',
        user: 'root',
        password: 'mRsDvDTjZuckqblgQTsJbNGjWnDPwxoO',
        database: 'railway',
        port: 30200,
        ssl: {
        rejectUnauthorized: false
    }
    // host: 'localhost',
    // user: 'root',
    // password: '', // apna MySQL password yahan likho
    // database: 'pharma_distribution' //name of the my database
});

// Connect to database
db.connect((err) => {
    if (err) {
        console.log('Database connection failed:', err);//incase if there is error this code will execute
    } else {
        console.log('Connected to MySQL database');
    }
});

module.exports = db;