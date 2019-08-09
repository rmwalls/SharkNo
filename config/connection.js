//This file connects to the database
var mysql = require("mysql");
var connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: "c584md9egjnm02sk.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        port: 3306,
        user: "gqltvlw99x6sn5b5",
        password: "root",
        database: "d0h81wtddmdymv4o"
    });
};

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("You're connected! Your id is " + connection.threadId);
});

module.exports = connection;