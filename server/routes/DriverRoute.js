import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/driverlogin", (req, res) => {
  // Combined query to select from both drivers and driver assistants
  const sql = `SELECT email, password, first_name, driver_ID, 'driver' AS role FROM driver 
               WHERE email = ? AND password = SHA2(?, 256) 
               UNION 
               SELECT email, password, first_name, driverA_ID AS driver_ID, 'driverassistant' AS role FROM driverassistant 
               WHERE email = ? AND password = SHA2(?, 256)`;

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
        const email = result[0].email;
        const role = result[0].role;
        const firstName = result[0].first_name;
        const driver_ID = result[0].driver_ID; // Use driver_ID for both roles

        // Create the JWT token with the role and email
        const token = jwt.sign({ role: role, email: email }, "jwt_secret_key", {
          expiresIn: "1d",
        });

        res.cookie("token", token);

        // Send a response based on the role (driver or driverassistant)
        return res.json({
          loginStatus: true,
          driverName: firstName,
          driver_ID: driver_ID, // Use driver_ID for both driver and assistant
          role: role,
          token: token,
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

export { router as driverRouter };
