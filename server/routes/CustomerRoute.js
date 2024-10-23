import express from "express";
import con from "../utils/db.js"; // Assuming con is your database connection utility
import jwt from "jsonwebtoken";

const router = express.Router();

// Customer login endpoint
router.post("/customerlogin", (req, res) => {
  // SQL query to validate email and password from the CustomerDetails view
  const sql = "SELECT * FROM CustomerDetails WHERE email = ? AND password = SHA2(?, 256)";
  
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) {
      return res.status(500).json({ loginStatus: false, Error: "Query error" });
    }
    
    if (result.length > 0) {
      const customerDetails = result[0]; // Get the first customer record from CustomerDetails view
      const token = jwt.sign(
        {
          role: "customer",
          email: customerDetails.Email,
          customer_ID: customerDetails.customer_ID, // Assuming customer_ID is part of the CustomerDetails view
          
        },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      
      // Set the token in a cookie
      res.cookie("token", token, { httpOnly: true }); // Add httpOnly for security

      // Send back all customer details in the response
      return res.json({
        loginStatus: true,
        customer_ID: customerDetails.customer_ID,
        customerName: customerDetails['First Name'],  // First name for welcome message
        fullName: customerDetails['Full Name'],       // Full name for the sidebar
        email: customerDetails.Email,
        phoneNumber: customerDetails['Phone Number'],
        address: customerDetails.Address,
        city: customerDetails.City
      });
    } else {
      return res.status(401).json({ loginStatus: false, Error: "Wrong email or password" });
    }
  });
});

export { router as customerRouter };
