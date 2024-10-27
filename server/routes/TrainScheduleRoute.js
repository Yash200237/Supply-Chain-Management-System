import express from "express";
import con from "../utils/db.js"; // Ensure your database connection is properly set up in db.js


const router = express.Router();

// Route to get train schedule
router.get("/api/TrainSchedule", (req, res) => {
  const sql = "SELECT train_ID, day, time, capacity, destination FROM Train"; // Adjust the table name if necessary
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
    ORDER BY city`
  ; // Query to get train IDs grouped by city

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
    GROUP BY city`
  ; // Query to get the count of available trains for each city

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
    SELECT c.city, COUNT(o.order_id) AS pending_orders
    FROM \`order\` o
    INNER JOIN customer c ON o.customer_id = c.customer_id
    LEFT JOIN TrainSchedule ts ON o.order_id = ts.order_ID
    WHERE ts.order_ID IS NULL
    AND c.city != 'Kandy'
    GROUP BY c.city`
  ;

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



// Route to assign orders to a train
router.post("/api/AssignOrders", (req, res) => {
  const { city, train_ID } = req.body;
  const manager_ID = 1; // Assume Kandy manager ID is hard-coded for now

  // Step 1: Check if there are pending orders for the city
  const checkPendingOrdersSql = `
    SELECT COUNT(*) AS pendingCount
    FROM \`order\` o
    INNER JOIN customer c ON o.customer_id = c.customer_id
    WHERE o.schedule_ID IS NULL AND c.city = ?`
  ;

  con.query(checkPendingOrdersSql, [city], (err, result) => {
    if (err) {
      console.error("Error checking pending orders:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const pendingCount = result[0].pendingCount;
    if (pendingCount === 0) {
      // If no pending orders, return an error response
      return res.status(400).json({ error: "No more pending orders" });
    }

    // Step 2: Fetch pending orders for the city
    const fetchPendingOrdersSql = `
      SELECT o.order_id, o.total_volume
      FROM \`Order\` o
      INNER JOIN customer c ON o.customer_id = c.customer_id
      WHERE o.schedule_ID IS NULL AND c.city = ?`
    ;

    con.query(fetchPendingOrdersSql, [city], (err, orders) => {
      if (err) {
        console.error("Error fetching pending orders:", err);
        return res.status(500).json({ error: "Database error" });
      }

      // Step 3: Fetch train capacity
      const fetchTrainCapacitySql = `
        SELECT capacity, day, time
        FROM Train
        WHERE train_ID = ?`
      ;

      con.query(fetchTrainCapacitySql, [train_ID], (err, train) => {
        if (err) {
          console.error("Error fetching train capacity:", err);
          return res.status(500).json({ error: "Database error" });
        }

        const trainCapacity = train[0].capacity;
        const trainDepartureDay = train[0].day;
        const trainDepartureTime = train[0].time;
        let totalVolume = 0;
        const assignedOrders = [];

        // Step 4: Assign orders to the train until capacity is reached
        for (const order of orders) {
          if (totalVolume + order.total_volume <= trainCapacity) {
            totalVolume += order.total_volume;
            assignedOrders.push(order.order_id);
          } else {
            break;
          }
        }

        if (assignedOrders.length === 0) {
          // No orders can be assigned due to capacity constraints
          return res.status(400).json({ error: "No orders can be assigned to this train due to capacity constraints" });
        }

        // Step 5: Insert assigned orders into TrainSchedule table
        const insertTrainScheduleSql = `
          INSERT INTO TrainSchedule (train_ID, order_ID, manager_ID)
          VALUES ?`
        ;

        const trainScheduleValues = assignedOrders.map(order_id => [train_ID, order_id, manager_ID]);

        con.query(insertTrainScheduleSql, [trainScheduleValues], (err) => {
          if (err) {
            console.error("Error inserting into TrainSchedule:", err);
            return res.status(500).json({ error: "Database error" });
          }

          res.json({ 
            message: "Orders assigned successfully", 
            assignedOrders,
            trainDepartureDay,
            trainDepartureTime
          });
        });
      });
    });
  });
});

// In TrainScheduleRoute.js (your Express route file)

router.get("/api/TrainFilledPercentage", async (req, res) => {
  try {
    const [trains] = await con.query("SELECT train_ID, capacity FROM Train");
    const [orders] = await con.query(`
      SELECT train_ID, SUM(total_volume) AS total_volume
      FROM \`Order\`
      WHERE train_ID IS NOT NULL
      GROUP BY train_ID`
    );

    // Calculate filled percentages
    const filledPercentages = trains.map((train) => {
      const order = orders.find((o) => o.train_ID === train.train_ID);
      const totalVolume = order ? order.total_volume : 0;
      const filledPercentage = (totalVolume / train.capacity) * 100;
      return {
        train_ID: train.train_ID,
        filledPercentage: Math.min(filledPercentage, 100), // Cap at 100%
      };
    });

    res.json(filledPercentages);
  } catch (error) {
    console.error("Error calculating filled percentage:", error);
    res.status(500).send("Server error");
  }
});

// Export the router
export { router as trainScheduleRouter };