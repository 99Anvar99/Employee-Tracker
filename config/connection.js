const mysql2 = require("mysql2");
var connection = mysql2.createConnection({
	// Connection 
	host: "localhost",
	port: 3306,
	// MySQL Workbench
	user: "root",
	password: "root",
	// Database created in schemea.sql
	database: "employeetracker_db"
});
module.exports = connection;