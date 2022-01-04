const mysql = require("mysql");

// SERVER USER mysql
// LOCALHOST USER root

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "mysql",
  password: "abcd1234",
  database: "olma_messestand",
});

module.exports = db;

// CREATE USER 'mysql'@'%' IDENTIFIED WITH mysql_native_password BY 'abcd1234';
// GRANT ALL PRIVILEGES ON *.* TO 'mysql'@'%';
