const mysql = require("mysql");
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "mysql",
  password: "abcd1234",
  database: "olma_messestand",
  // socketPath: '/var/lib/mysql/mysql.sock'

});

module.exports = db;

// CREATE USER 'mysql'@'%' IDENTIFIED WITH mysql_native_password BY 'abcd1234';
// GRANT ALL PRIVILEGES ON *.* TO 'mysql'@'%';
