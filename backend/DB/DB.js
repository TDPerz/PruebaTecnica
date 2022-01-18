const mysql = require('mysql')
var con = mysql.createConnection({
    host:"localhost",
    port:"3306",
    user: "root",
    database: "basededatos"
})

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = con