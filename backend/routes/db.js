var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "student_application_management_system",
});

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;