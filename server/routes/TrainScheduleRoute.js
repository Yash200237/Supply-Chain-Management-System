import express from "express";
import con from "../utils/db.js"; // Adjust the path to your database connection

const router = express.Router();

// Route to get train data
router.get("/api/Train", (req, res) => {
  const sql = "SELECT * FROM Train"; // Query the Train table
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

export { router as trainScheduleRouter };