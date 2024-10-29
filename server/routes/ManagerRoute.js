import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/managerlogin", (req, res) => {
  const sql =
    "SELECT * FROM ManagerDetails WHERE email = ? AND password = SHA2(?, 256)";
  
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) {
      return res.json({ loginStatus: false, Error: "Query error" });
    }

    if (result.length > 0) {
      const managerDetails = result[0]; // Get the first manager record from ManagerDetails
      const token = jwt.sign(
        {
          role: "manager",
          email: managerDetails.Email,
          manager_ID: managerDetails.manager_ID,
        },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie("token", token);

      return res.json({
        loginStatus: true,
        manager_ID: managerDetails.manager_ID,
        managerName: managerDetails["First Name"], // First name for welcome message
        fullName: managerDetails["Full Name"], // Full name for sidebar
        email: managerDetails.Email,
        phoneNumber: managerDetails["Phone Number"],
        city: managerDetails.City,
      });
    } else {
      return res.json({ loginStatus: false, Error: "wrong email or password" });
    }
  });
});

export { router as managerRouter };
