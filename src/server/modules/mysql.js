const mysql = require('mysql');
const util = require('util');

const env = process.env.NODE_ENV || 'development';
const isDev = env === 'development';
const host = isDev ? 'localhost' : 'mysql';
const user = 'node';
const password = isDev
  ? 'example123'
  : process.env.MYSQL_PASSWORD || 'example123';
const database = 'plakaty';
const port = 3306;

const mc = mysql.createPool({
  host,
  user,
  password,
  database,
  port
});

mc.query('SELECT 1 + 1 AS solution', (error, results) => {
  if (error) throw error;
  const mySqlStatus = results[0].solution === 2 ? 'OK' : 'ERROR';
  console.log(`MYSQL: ${mySqlStatus}`);
});

// IMPORTANT TO USE ASYNC / AWAIT !
mc.query = util.promisify(mc.query);

module.exports = mc;
