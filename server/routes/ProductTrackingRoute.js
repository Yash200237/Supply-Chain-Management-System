import express from "express";
import con from "../utils/db.js"; // Assuming con is your database connection utility

const router = express.Router();

// Endpoint to get orders for a specific customer using customer ID
router.get("/track/:customer_ID", (req, res) => {
  const customer_ID = req.params.customer_ID;

  // SQL query to fetch orders based on customerId
  //const sql = "SELECT * FROM `order` WHERE customer_ID = ?"; // Adjust table and field names accordingly

  const sql = "SELECT * FROM TrackDelivery WHERE customer_ID = ?";

  con.query(sql, [customer_ID], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database query error" });
      console.log(result);
    }
    return res.json(result); // Send back the fetched orders
  });
});

export { router as productTrackingRouter };
