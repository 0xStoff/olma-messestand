const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "mysql",
  password: "abcd1234",
  database: "olma_messestand",
});

module.exports = db;

// CREATE USER 'mysql'@'%' IDENTIFIED WITH mysql_native_password BY 'abcd1234';
// GRANT ALL PRIVILEGES ON *.* TO 'mysql'@'%';
