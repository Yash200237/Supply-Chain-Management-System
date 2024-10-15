import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/managerlogin", (req, res) => {
  const sql =
    "SELECT * FROM manager WHERE email = ? AND password = SHA2(?, 256)";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const manager = result[0]
      const email = result[0].email;
      const token = jwt.sign(
        { role: "manager", 
          email: email,
          manager_ID: manager.manager_ID,
         },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie("token", token);
      return res.json({ loginStatus: true,
        manager_ID: manager.manager_ID,
        managerName: manager.first_name,});
    } else {
      return res.json({ loginStatus: false, Error: "wrong email or password" });
    }
  });
});

export { router as managerRouter };
