const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: '127.0.0.1',           
  port: 3306,                   
  user: 'root',                 
  password: 'pass',
  database: 'golden_key_bookshop',
  connectTimeout: 10000
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err.message);
    return;
  }
  
  console.log('Connected to MySQL successfully!');
  console.log('Using database: golden_key_bookshop');

});

module.exports = connection;