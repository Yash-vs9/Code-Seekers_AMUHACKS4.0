require('dotenv').config();
const mysql = require('mysql2');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'HealthCare',
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
module.exports = pool.promise();