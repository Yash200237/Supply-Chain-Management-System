import express from "express";
import con from "../utils/db.js";  // Ensure your database connection is properly set up in db.js

const router = express.Router();

// Route to get train schedule
router.get("/api/TrainSchedule", (req, res) => {
  const sql = "SELECT * FROM Train";  // Adjust the table name if necessary
  con.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching train data: ", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result);
  });
});

// Route to get train IDs grouped by city
router.get("/api/TrainCityMap", (req, res) => {
  const sql = `
    SELECT city, train_ID
    FROM Train
    ORDER BY city
  `; // Query to get train IDs grouped by city

  con.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching train city map data: ", err);
      return res.status(500).json({ error: "Database error" });
    }

    // Format the result into a map of city to train IDs
    const cityTrainMap = result.reduce((acc, row) => {
      const { city, train_ID } = row;
      if (!acc[city]) {
        acc[city] = [];
      }
      acc[city].push(train_ID);
      return acc;
    }, {});

    res.json(cityTrainMap);
  });
});

// Route to get available trains count for each city
router.get("/api/AvailableTrainsCount", (req, res) => {
  const sql = `
    SELECT city, COUNT(*) as count
    FROM Train
    GROUP BY city
  `; // Query to get the count of available trains for each city

  con.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching available trains count data: ", err);
      return res.status(500).json({ error: "Database error" });
    }

    // Format the result into a map of city to train count
    const availableTrainsCount = result.reduce((acc, row) => {
      const { city, count } = row;
      acc[city] = count;
      return acc;
    }, {});

    res.json(availableTrainsCount);
  });
});

// Route to get pending orders for each city
router.get("/api/PendingOrders", (req, res) => {
  const sql = `
    SELECT 
      c.city,
      COUNT(o.order_id) AS pending_orders
    FROM \`order\` o
    INNER JOIN customer c ON o.customer_id = c.customer_id
    WHERE o.schedule_ID IS NULL
    GROUP BY c.city
  `;

  con.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching pending orders data: ", err);
      return res.status(500).json({ error: "Database error" });
    }
    console.log(result);

    const pendingOrdersCount = result.reduce((acc, row) => {
      acc[row.city] = row.pending_orders;
      return acc;
    }, {});

    res.json(pendingOrdersCount);
  });
});

// Export the router
export { router as trainScheduleRouter };
