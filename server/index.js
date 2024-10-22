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

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);
app.use(express.json());

// Set up your routes
app.use("/start", managerRouter);
app.use("/auth", signupRouter);
app.use("/start", customerRouter);
app.use("/start", driverRouter);
app.use(registrationRouter);
app.use("/api", productRouter);
app.use("/cart", cartRouter); // Use the cart router
app.use("/api", productTrackingRouter); // Use the product tracking router

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
