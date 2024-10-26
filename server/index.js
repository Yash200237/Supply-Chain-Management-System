import express from "express";
import cors from "cors";
import { managerRouter } from "./routes/ManagerRoute.js";
import { signupRouter } from "./routes/SignupRoute.js";
import { customerRouter } from "./routes/CustomerRoute.js";
import { driverRouter } from "./routes/DriverRoute.js";
import { registrationRouter } from "./routes/RegistrationRoute.js";
import { productRouter } from "./routes/ProductRoute.js"; // Import the product route
import { cartRouter } from "./routes/CartRoute.js"; // Import the cart router
import { productTrackingRouter } from "./routes/ProductTrackingRoute.js"; // Import the tracking router
import { truckScheduleRouter } from "./routes/TruckScheduleRoute.js"; // Import the tracking router

//import con from './utils/db.js';

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);
app.use(express.json());
app.use(managerRouter);
app.use("/auth", signupRouter);
app.use(customerRouter);
app.use(driverRouter);
app.use(registrationRouter);
app.use("/api", productRouter);
app.use("/cart", cartRouter); // Use the cart router
app.use("/api", productTrackingRouter); // Use the product tracking router
app.use("/api", truckScheduleRouter); // Use the product tracking router

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
