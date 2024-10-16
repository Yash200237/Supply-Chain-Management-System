import mysql from "mysql2";

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "yashodha",
  database: "supply_chain_management_system",
});

con.connect(function (err) {
  if (err) {
    console.log("connection error");
  } else {
    console.log("connected");
  }
});

export default con;
