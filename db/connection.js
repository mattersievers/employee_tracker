const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user:'root',
        password:'v3g3t@bl3H0+r@+$',
        database:'employees'
    },
    console.log('Connected to the employee database.')
);

module.exports = db;