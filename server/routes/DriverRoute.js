import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = "jwt_secret_key";

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = decoded;
    next();
  });
};

router.post("/driverlogin", (req, res) => {
  // Combined query to select from both drivers and driver assistants
  const sql = `SELECT * FROM DriverDetails 
WHERE Email = ? AND Password = SHA2(?, 256)`;

  // Parameters for both queries
  con.query(
    sql,
    [req.body.email, req.body.password, req.body.email, req.body.password],
    (err, result) => {
      // If there's an error with the query, return a query error
      if (err) {
        console.error("Query error:", err); // Log the error for debugging
        return res.json({ loginStatus: false, Error: "Query error" });
      }
      // If no user is found, return an error

      // If there is a matching result, handle the login
      if (result.length > 0) {
        const driverDetails = result[0];
        
        // Create the JWT token with the role and email
        const token = jwt.sign(
          { email: driverDetails.Email,
            role: driverDetails.role,
            driver_ID: driverDetails.driver_ID, // Use driver_ID for both roles
          }, "jwt_secret_key", {
          expiresIn: "1d",
        });

        res.cookie("token", token);

        // Send a response based on the role (driver or driverassistant)
        return res.json({
          loginStatus: true,
          role: driverDetails.role,
          token: token,
          driver_ID: driverDetails.driver_ID,
          driverName: driverDetails["First Name"], // First name for welcome message
          fullName: driverDetails["Full Name"], // Full name for the sidebar
          email: driverDetails.Email,
          phoneNumber: driverDetails["Phone Number"],
          city: driverDetails.City,
        });
      } else {
        // If no result is found, return a login failure
        return res.json({
          loginStatus: false,
          Error: "Wrong email or password",
        });
      }
    }
  );
});

// Route to get driver schedule using the driver's ID (requires verification)
router.get("/driverschedule/:driverID", verifyToken, (req, res) => {
  const driverID = req.params.driverID;

  const sql = `SELECT * FROM driverschedules WHERE driver_ID = ?`;
  con.query(sql, [driverID], (err, result) => {
    if (err) {
      console.error("Query error:", err);
      return res.json({ success: false, message: "Failed to fetch schedules" });
    }
    return res.json(result);
  });
});


// Fetch driver details by driver ID
router.get('/driverdetails/:driverID', (req, res) => {
  const driverID = req.params.driverID; // Get driver ID from request parameters

  // SQL query to fetch the driver's details
  const sql = `SELECT * FROM DriverDetails WHERE driver_ID = ?`;

  // Execute the query
  con.query(sql, [driverID], (err, results) => {
    // If there's an error with the query, return a query error
    if (err) {
      console.error("Query error:", err); // Log the error for debugging
      return res.status(500).json({ error: "Database query error" });
    }

    // Check if results are found
    if (results.length > 0) {
      const driverDetails = results[0]; // Get the first driver detail found

      // Send the driver details as a response
      return res.json({
        loginStatus: true,
        driver_ID: driverDetails.driver_ID,
        driverName: driverDetails["First Name"], // First name for welcome message
        fullName: driverDetails["Full Name"], // Full name for the sidebar
        email: driverDetails.Email,
        phoneNumber: driverDetails["Phone Number"],
        city: driverDetails.City,
      });
    } else {
      // If no result is found, return a not found response
      return res.status(404).json({
        loginStatus: false,
        error: "No driver found with this ID",
      });
    }
  });
});

export { router as driverRouter };
