import mysql from "mysql2";

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "20020430",
  database: "scms",
});

con.connect(function (err) {
  if (err) {
    console.log("connection error");
  } else {
    console.log("connected");
  }
});

export default con;
