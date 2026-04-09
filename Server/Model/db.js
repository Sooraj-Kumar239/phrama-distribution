// const sql = require('mssql');
const mysql = require('mysql2');
// Database connection create
// const config = {
    // railwqay
        // const db = require('mysql2');

            const db = mysql.createConnection({
           
            host: "metro.proxy.rlwy.net",
            user: "root",
            password: "mRsDvDTjZuckqblgQTsJbNGjWnDPwxoO",
            database: "railway",
            port: 30200
            
        });

    // railway end
    // user: 'adminuser',
    // password:  'sooraj.1',
    // server: 'pharma-sql-server123.database.windows.net', 
    // database: 'pharma_db',
    // options: {
    //     encrypt: true,
    //     trustServerCertificate: true
    
    // host: 'localhost',
    // user: 'root',
    // password: '', // apna MySQL password yahan likho
    // database: 'pharma_distribution' //name of the my database
// };

// Connect to database
// sql.connect(config)
// .then(() => {
//     console.log("Connected to Azure SQL ✅");
// })
// .catch(err => {
//     console.log("Connection failed ❌", err);
// }); 
db.connect((err) => {
  if (err) {
    console.log("DB Error:", err);
  } else {
    console.log("Connected ✅");
  }
});
// module.exports = sql;
module.exports = db;