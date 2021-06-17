const mysql = require("mysql");

const con = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.ROOT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
});
module.exports = con;
