import express from "express";
import cors from "cors";
import { managerRouter } from "./routes/ManagerRoute.js";
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
app.use("/auth", managerRouter);

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
