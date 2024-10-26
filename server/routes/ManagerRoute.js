import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/managerlogin", (req, res) => {
  const sql =
    "SELECT * FROM manager WHERE email = ? AND password = SHA2(?, 256)";

  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) {
      return res.json({ loginStatus: false, Error: "Query error" });
    }

    if (result.length > 0) {
      const email = result[0].email;
      const manager_ID = result[0].manager_ID; // Extract manager_ID
      const managerName = result[0].first_name; // Extract first_name
      const store_ID = result[0].store_ID; // Manager's store ID

      // Generate the JWT token
      const token = jwt.sign(
        { role: "manager", email: email },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );

      res.cookie("token", token);

      // Return the manager's ID and name
      return res.json({
        loginStatus: true,
        manager_ID: manager_ID,
        managerName: managerName,
        store_ID: store_ID, // Pass the store ID to the frontend
      });
    } else {
      return res.json({ loginStatus: false, Error: "wrong email or password" });
    }
  });
});

export { router as managerRouter };
