var mysql = require("mysql")
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MANJIMAK@2000",
    database: "bank_management"
})

connection.connect(function (err) {
    if (err) throw err
    console.log("connection success")
})
module.exports = connection;