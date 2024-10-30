import mysql from "mysql2";

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "220039Amora@2929",
  database: "scms",
  multipleStatements: true, // Enables multiple result sets
});

con.connect(function (err) {
  if (err) {
    console.log("connection error");
  } else {
    console.log("connected");
  }
});

export default con;
