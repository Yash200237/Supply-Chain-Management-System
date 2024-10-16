import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/customerlogin", (req, res) => {
  const sql =
    "SELECT * FROM customer WHERE email = ? AND password = SHA2(?, 256)";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const customer = result[0]; // Assign result[0] to customer
      const email = customer.email;
      const token = jwt.sign(
        {
          role: "customer",
          email: customer.email,
          customer_ID: customer.customer_ID,
        }, // Add customer_ID to the token
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie("token", token);
      return res.json({ loginStatus: true, customer_ID: customer.customer_ID });
    } else {
      return res.json({ loginStatus: false, Error: "wrong email or password" });
    }
  });
});

export { router as customerRouter };
