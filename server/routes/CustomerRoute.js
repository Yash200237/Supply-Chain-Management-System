import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/customerlogin", (req, res) => {
  // SQL query to validate email and password from the CustomerDetails view
  const sql =
    "SELECT * FROM CustomerDetails WHERE email = ? AND password = SHA2(?, 256)";

  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const customerDetails = result[0]; // Get the first customer record from CustomerDetails view
      const token = jwt.sign(
        {
          role: "customer",
          email: customerDetails.Email,
          customer_ID: customerDetails.customer_ID, // Assuming customer_ID is part of the CustomerDetails view
        }, // Add customer_ID to the token
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      // Set token as cookie (this part can stay as is)
      res.cookie("token", token); // Add httpOnly for security

      // Return token and other data in the JSON response
      return res.json({
        loginStatus: true,
        token, // Send token in the response so the front-end can use it
        role: "customer", // Example role
        customer_ID: customerDetails.customer_ID,
        customerName: customerDetails["First Name"], // First name for welcome message
        fullName: customerDetails["Full Name"], // Full name for the sidebar
        email: customerDetails.Email,
        phoneNumber: customerDetails["Phone Number"],
        address: customerDetails.Address,
        city: customerDetails.City,
      });
    } else {
      return res.json({ loginStatus: false, Error: "wrong email or password" });
    }
  });
});

export { router as customerRouter };
