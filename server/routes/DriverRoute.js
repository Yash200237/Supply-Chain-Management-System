import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/driverlogin", (req, res) => {
  const sql = `SELECT * FROM (
    SELECT email, password, 'driver' AS role FROM driver 
    UNION 
    SELECT email, password, 'driverassistant' AS role FROM driverassistant
  ) AS combined
  WHERE email = ? AND password = SHA2(?, 256)`;
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const driver = result[0];
      const email = result[0].email;
      const role = result[0].role;
      const token = jwt.sign({ role: role, email: email }, "jwt_secret_key", {
        expiresIn: "1d",
      });
      res.cookie("token", token);
      return res.json({
        loginStatus: true,
        driverName: driver.first_name,
      });
    } else {
      return res.json({ loginStatus: false, Error: "wrong email or password" });
    }
  });
});

export { router as driverRouter };
