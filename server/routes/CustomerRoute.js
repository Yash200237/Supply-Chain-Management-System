import express from "express";
import con from "../utils/db.js"; // Assuming con is your database connection utility
import jwt from "jsonwebtoken";

const router = express.Router();

// Customer login endpoint
router.post("/customerlogin", (req, res) => {
  // SQL query to select customer based on email and password
  const sql = "SELECT * FROM customer WHERE email = ? AND password = SHA2(?, 256)";
  
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) {
      return res.status(500).json({ loginStatus: false, Error: "Query error" });
    }
    
    if (result.length > 0) {
      const customer = result[0]; // Get the first customer record
      const token = jwt.sign(
        {
          role: "customer",
          email: customer.email,
          customer_ID: customer.customer_ID,
        },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );

      // Set the token in a cookie
      res.cookie("token", token, { httpOnly: true }); // Add httpOnly for security

      // Send back customer ID and name in the response
      return res.json({
        loginStatus: true,
        customer_ID: customer.customer_ID,
        customerName: customer.first_name, // Include customer name in the response
      });
    } else {
      return res.status(401).json({ loginStatus: false, Error: "Wrong email or password" });
    }
  });
});

export { router as customerRouter };

