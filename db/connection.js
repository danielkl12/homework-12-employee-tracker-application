const util = require("util");
const mysql = require('mysql');
require('dotenv').config({path: '.env'});


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "employees"
  });
  
  connection.connect((err) => {
    if (err) throw Error(err)
    console.log(`connected as ID ${connection.threadId}`)
    promptQuestions();

  });

  connection.query = util.promisify(connection.query);

  module.exports = connection;