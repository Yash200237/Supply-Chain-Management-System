import express from "express";
import con from "../utils/db.js";
import cron from "node-cron"; // Import node-cron

const router = express.Router();

// Route to get train schedule
router.get("/api/TrainSchedule", (req, res) => {
  const sql = "SELECT train_ID, day, time, capacity, destination FROM Train";
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
    SELECT destination, train_ID
    FROM Train
    ORDER BY destination`;

  con.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching train city map data: ", err);
      return res.status(500).json({ error: "Database error" });
    }

    const cityTrainMap = result.reduce((acc, row) => {
      const { destination, train_ID } = row;
      if (!acc[destination]) acc[destination] = [];
      acc[destination].push(train_ID);
      return acc;
    }, {});

    res.json(cityTrainMap);
  });
});

// Route to get available trains count for each city
router.get("/api/AvailableTrainsCount", (req, res) => {
  const sql = `
    SELECT destination, COUNT(*) as count
    FROM Train
    GROUP BY destination`;

  con.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching available trains count data: ", err);
      return res.status(500).json({ error: "Database error" });
    }

    const availableTrainsCount = result.reduce((acc, row) => {
      acc[row.destination] = row.count;
      return acc;
    }, {});

    res.json(availableTrainsCount);
  });
});

// Route to get pending orders for each city
router.get("/api/PendingOrders", (req, res) => {
  const sql = `
    SELECT c.city, COUNT(o.order_id) AS pending_orders
    FROM \`order\` o
    INNER JOIN customer c ON o.customer_id = c.customer_id
    WHERE o.status_ID = 1  
    AND c.city != 'Kandy'  
    GROUP BY c.city`;

  con.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching pending orders data: ", err);
      return res.status(500).json({ error: "Database error" });
    }

    const pendingOrdersCount = result.reduce((acc, row) => {
      acc[row.city] = row.pending_orders;
      return acc;
    }, {});

    res.json(pendingOrdersCount);
  });
});

// Route to assign orders to a train
router.post("/api/AssignOrders", (req, res) => {
  const { city, train_ID, departureDate } = req.body;
  const manager_ID = 1; // Assume Kandy manager ID is hard-coded for now

  // Check pending orders for the city
  const checkPendingOrdersSql = `
    SELECT COUNT(*) AS pendingCount
    FROM \`order\` o
    INNER JOIN customer c ON o.customer_id = c.customer_id
    WHERE o.status_ID = 1 
    AND c.city = ?;        
  `;

  con.query(checkPendingOrdersSql, [city], (err, result) => {
    if (err) {
      console.error("Error checking pending orders:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const pendingCount = result[0].pendingCount;
    if (pendingCount === 0) {
      return res.status(400).json({ error: "No more pending orders" });
    }

    // Fetch pending orders for the city
    const fetchPendingOrdersSql = `
      SELECT o.order_id, o.total_volume
      FROM \`order\` o
      INNER JOIN customer c ON o.customer_id = c.customer_id
      WHERE c.city = ? 
        AND o.status_ID = 1
      ORDER BY o.date ASC;
    `;

    con.query(fetchPendingOrdersSql, [city], (err, orders) => {
      if (err) {
        console.error("Error fetching pending orders:", err);
        return res.status(500).json({ error: "Database error" });
      }

      // Fetch train remaining capacity
      const fetchTrainRemainingCapacitySql = `
        SELECT remainingCapacity, day, time 
        FROM Train 
        WHERE train_ID = ?;
      `;

      con.query(fetchTrainRemainingCapacitySql, [train_ID], (err, trainResult) => {
        if (err) {
          console.error("Error fetching train remaining capacity:", err);
          return res.status(500).json({ error: "Database error" });
        }

        if (trainResult.length === 0) {
          return res.status(404).json({ error: "Train not found" });
        }

        let remainingCapacity = trainResult[0].remainingCapacity;
        const trainDepartureDay = trainResult[0].day;
        const trainDepartureTime = trainResult[0].time;

        // Check if it's within 24 hours of departure
        const departureString = `${trainDepartureDay}T${trainDepartureTime}`;
        const trainDepartureDateTime = new Date(departureString);
        const currentDateTime = new Date();
        const twentyFourHoursInMillis = 24 * 60 * 60 * 1000;

        if (trainDepartureDateTime - currentDateTime < twentyFourHoursInMillis) {
          return res.status(400).json({ error: "Cannot assign orders within 24 hours before train departure." });
        }

        // Order assignment logic continues if within valid period
        const assignedOrders = [];
        for (const order of orders) {
          if (order.total_volume <= remainingCapacity) {
            assignedOrders.push(order.order_id);
            remainingCapacity -= order.total_volume;
          }
        }

        if (assignedOrders.length === 0) {
          return res.status(400).json({ error: "No orders can be assigned to this train due to capacity constraints" });
        }

        // Insert assigned orders into TrainSchedule
        const insertTrainScheduleSql = `
          INSERT INTO TrainSchedule (train_ID, order_ID, manager_ID, departureDate)
          VALUES ?;
        `;

        const trainScheduleValues = assignedOrders.map(order_id => [train_ID, order_id, manager_ID, departureDate]);

        con.query(insertTrainScheduleSql, [trainScheduleValues], (err) => {
          if (err) {
            console.error("Error inserting into TrainSchedule:", err);
            return res.status(500).json({ error: "Database error" });
          }

          // Update status_ID of assigned orders to 2
          const placeholders = assignedOrders.map(() => '?').join(',');
          const updateOrderStatusSql = `
            UPDATE \`order\`
            SET status_ID = 2
            WHERE order_id IN (${placeholders});
          `;

          con.query(updateOrderStatusSql, assignedOrders, (err) => {
            if (err) {
              console.error("Error updating order status:", err);
              return res.status(500).json({ error: "Database error" });
            }

            // Update remaining capacity in Train table
            const updateRemainingCapacitySql = `
              UPDATE Train
              SET remainingCapacity = ?
              WHERE train_ID = ?;
            `;
            
            con.query(updateRemainingCapacitySql, [remainingCapacity, train_ID], (err) => {
              if (err) {
                console.error("Error updating remaining capacity:", err);
                return res.status(500).json({ error: "Database error" });
              }

              res.json({ 
                message: "Orders assigned successfully", 
                assignedOrders,
                trainDepartureDay,
                trainDepartureTime,
                departureDate
              });
            });
          });
        });
      });
    });
  });
});

// Route to get filled percentages for each train
router.get("/api/TrainFilledPercentage", (req, res) => {
  const query = `
    SELECT t.train_ID, 
           (t.capacity - t.remainingCapacity) / t.capacity * 100 AS filledPercentage 
    FROM Train t;
  `;
  
  con.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching filled percentages: ", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result);
  });
});

// Cron job to reset remaining capacity for trains leaving for a trip
cron.schedule('* * * * *', () => {
  const currentDateTime = new Date();
  const sql = `
    SELECT DISTINCT ts.train_ID 
    FROM TrainSchedule ts
    JOIN Train t ON ts.train_ID = t.train_ID
    WHERE CONCAT(ts.departureDate, ' ', t.time) < NOW();
  `;
  
  con.query(sql, [currentDateTime], (err, results) => {
    if (err) {
      console.error("Error fetching trains for reset: ", err);
      return;
    }
    results.forEach(train => {
      const resetCapacitySql = `
        UPDATE Train
        SET remainingCapacity = capacity
        WHERE train_ID = ?;
      `;
      con.query(resetCapacitySql, [train.train_ID], (err) => {
        if (err) {
          console.error("Error resetting capacity for train: ", err);
        }
      });
    });
  });
});

export { router as trainScheduleRouter };
