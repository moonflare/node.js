const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

let connection;

function getDbConnection() {
  if (!connection) {
    connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    connection.connect((err) => {
      if (err) {
        console.error("Database connection failed", err);
      } else {
        console.log("Database connection succeeded");
      }
    });
  }

  return connection
};



module.exports = getDbConnection();