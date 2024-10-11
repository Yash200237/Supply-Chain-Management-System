import express from "express";
import con from "../utils/db.js"; // Assuming this is your database connection
import crypto from "crypto";

const router = express.Router();

router.post("/registration", (req, res) => {
  const checkUserSql = "SELECT * FROM driver WHERE email = ? OR username = ?";
  con.query(
    checkUserSql,
    [req.body.email, req.body.username],
    (err, result) => {
      if (err) {
        console.error("Error checking for existing user: ", err);
        return res
          .status(500)
          .json({ signupStatus: false, Error: "Database error" });
      }

      // Step 2: If a user with the same email or username is found, return an error
      if (result.length > 0) {
        return res.status(400).json({
          signupStatus: false,
          Error: "Email or username already in use",
        });
      }
      const hashedPassword = crypto
        .createHash("sha256")
        .update(req.body.password)
        .digest("hex");

      // Check if the Type is driver or driverassistant and insert into the respective table
      let sql = "";
      if (req.body.Type === "driver") {
        sql =
          "INSERT INTO Driver (first_name, last_name, city, username, email, password, phone_number, total_hours, weekly_hours, monthly_salary) VALUES(?)";
      } else if (req.body.Type === "driverassistant") {
        sql =
          "INSERT INTO DriverAssistant (first_name, last_name, city, username, email, password, phone_number, total_hours, weekly_hours, monthly_salary) VALUES(?)";
      }
      const values = [
        req.body.firstname,
        req.body.lastname,
        req.body.closestcity,
        req.body.username,
        req.body.email,
        hashedPassword,
        req.body.phone,
        0, // total_hours set to 0
        0, // weekly_hours set to 0
        req.body.monthlysalary,
      ];

      con.query(sql, [values], (err, data) => {
        if (err) {
          return res
            .status(500)
            .json({ signupStatus: false, Error: "Query error" });
        }
        return res.json({ signupStatus: true });
      });
    }
  );
});
export { router as registrationRouter };
