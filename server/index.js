import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import con from "./utils/db.js"; // Ensure this points to your DB connection file
import cookieParser from "cookie-parser";
import { managerRouter } from "./routes/ManagerRoute.js";
import { signupRouter } from "./routes/SignupRoute.js";
import { customerRouter } from "./routes/CustomerRoute.js";
import { driverRouter } from "./routes/DriverRoute.js";
import { registrationRouter } from "./routes/RegistrationRoute.js";
import { trainScheduleRouter } from "./routes/TrainScheduleRoute.js"; // Import the train schedule router

// Initialize Express app
const app = express();

// Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);

// Register routes
app.use("/start", managerRouter);
app.use("/auth", signupRouter);
app.use("/start", customerRouter);
app.use("/start", driverRouter);
app.use(registrationRouter);
app.use(trainScheduleRouter); // Register the train schedule router

// JWT authentication middleware
const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token; // Get token from cookies
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, "jwt_secret_key", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = user; // Attach decoded user to the request
    next();
  });
};

// Endpoint to get driver details and working hours (protected by JWT)
app.get("/driver/dashboard", authenticateJWT, (req, res) => {
  const email = req.user.email; // Get email from the decoded token

  const driverDetailsQuery = "SELECT username, driver_ID FROM driver WHERE email = ?";
  const workScheduleQuery = `
    SELECT monday_hours, tuesday_hours, wednesday_hours, thursday_hours, friday_hours, saturday_hours 
    FROM driverworkschedule 
    WHERE email = ?`;

  // Fetch driver details
  con.query(driverDetailsQuery, [email], (err, driverDetailsResult) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    if (driverDetailsResult.length > 0) {
      // If driver details found, fetch working hours
      con.query(workScheduleQuery, [email], (err, workScheduleResult) => {
        if (err) {
          return res.status(500).json({ error: "Database error" });
        }
        if (workScheduleResult.length > 0) {
          // Return driver details and working hours
          res.json({
            driverDetails: driverDetailsResult[0],
            workingHours: workScheduleResult[0],
          });
        } else {
          res.status(404).json({ message: "Work schedule not found" });
        }
      });
    } else {
      res.status(404).json({ message: "Driver not found" });
    }
  });
});

// Start server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});