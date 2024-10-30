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

// Login route for driver and driver assistant
router.post("/driverlogin", (req, res) => {
  const sql = `SELECT email, password, first_name, driver_ID, 'driver' AS role FROM driver 
               WHERE email = ? AND password = SHA2(?, 256) 
               UNION 
               SELECT email, password, first_name, driverA_ID AS driver_ID, 'driverassistant' AS role FROM driverassistant 
               WHERE email = ? AND password = SHA2(?, 256)`;

  con.query(
    sql,
    [req.body.email, req.body.password, req.body.email, req.body.password],
    (err, result) => {
      if (err) {
        console.error("Query error:", err);
        return res.json({ loginStatus: false, Error: "Query error" });
      }

      if (result.length > 0) {
        const { email, role, first_name: firstName, driver_ID } = result[0];

        const token = jwt.sign({ role, email }, JWT_SECRET, {
          expiresIn: "1d",
        });

        res.cookie("token", token);

        return res.json({
          loginStatus: true,
          driverName: firstName,
          driver_ID,
          role,
          token,
        });
      } else {
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

export { router as driverRouter };
