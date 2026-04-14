const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Pranav@34", 
    database: "tasksdb",
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = pool;