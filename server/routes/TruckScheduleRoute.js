import express from "express";
import cron from "node-cron";
import con from "../utils/db.js"; // Your database connection

const router = express.Router();

// Endpoint to create a truck schedule
router.post("/create-schedule", (req, res) => {
  const { driver_ID, driverA_ID, truck_Id, route_ID, date, time, manager_ID } =
    req.body;

  con.query(
    `CALL CreateTruckSchedule(?, ?, ?, ?, ?, ?, ?, @success, @message);
       SELECT @success AS success, @message AS message;`,
    [driver_ID, driverA_ID, truck_Id, route_ID, date, time, manager_ID],
    (err, results) => {
      if (err) {
        console.error("Error executing procedure:", err);
        return res.status(500).json({ error: "Database error" });
      }
      const success = results[1][0].success;
      const message = results[1][0].message;

      res.status(200).json({ success, message });
    }
  );
});

// Route to get recent schedules
router.get("/recent-schedules", (req, res) => {
  const managerId = req.query.manager_ID;

  // Validate managerId
  if (!managerId) {
    return res.status(400).json({ error: "Manager ID is required" });
  }

  // Call the stored procedure
  con.query("CALL GetRecentSchedules(?)", [managerId], (error, results) => {
    if (error) {
      console.error("Error fetching recent schedules:", error);
      return res.status(500).json({ error: "Database error" });
    }

    // MySQL stored procedure returns results in an array format.
    const schedules = results[0]; // The first element contains the result set

    res.json({ schedules });
  });
});

// Endpoint to update schedule to mark as fixed
router.put("/fix-schedule/:schedule_ID", (req, res) => {
  const { schedule_ID } = req.params;

  // Call the stored procedure to check and update hours after marking a schedule as completed
  con.query(
    `CALL UpdateHoursAfterCompletion(?, @success, @message);
   SELECT @success AS success, @message AS message;`,
    [schedule_ID],
    (err, results) => {
      if (err) {
        console.error("Error executing procedure:", err);
        return res
          .status(500)
          .json({ success: false, error: "Database error" });
      }

      const procedureResult = results[1] && results[1][0];
      const success = procedureResult ? procedureResult.success : false;
      const message = procedureResult
        ? procedureResult.message
        : "Unknown error";

      if (success) {
        res.status(200).json({ success: true, message });
      } else {
        res.status(400).json({ success: false, message });
      }
    }
  );
});

// Schedule task to run every minute
cron.schedule("* * * * *", () => {
  const sql = `
    UPDATE TruckSchedule
    SET status = 'on progress'
    WHERE status = 'scheduled' AND CONCAT(date, ' ', time) <= NOW()
  `;

  con.query(sql, (err, result) => {
    if (err) {
      console.error("Error updating schedule status in cron job:", err);
    } else if (result.affectedRows > 0) {
      console.log("Updated schedule status for records where time has passed.");
    }
  });
});

// Endpoint to get all schedule data (drivers, assistants, trucks, routes)
router.get("/schedule-data", (req, res) => {
  const { store_ID } = req.query; // Get the city and store_ID from the query parameters

  const sql = "CALL GetAllScheduleData(?)"; // Assuming stored procedure GetAllScheduleData fetches all related data
  con.query(sql, [store_ID], (err, results) => {
    if (err) {
      console.error("Error fetching schedule data:", err);
      return res.status(500).json({ error: "Database error" });
    }
    return res.json({
      drivers: results[0],
      driverAssistants: results[1],
      trucks: results[2],
      routes: results[3],
    });
  });
});

// Endpoint to assign orders to a schedule
router.put("/assign-orders/:schedule_ID", (req, res) => {
  const { schedule_ID } = req.params;

  con.query(
    `CALL AssignOrdersToSchedule(?, @pending_orders, @already_assigned);
     SELECT @pending_orders AS pending_orders, @already_assigned AS already_assigned;`,
    [schedule_ID],
    (err, results) => {
      if (err) {
        console.error("Error executing procedure:", err);
        return res
          .status(500)
          .json({ success: false, error: "Database error" });
      }

      // Fetch values for pending orders and already assigned flag
      const pendingOrders = results[1][0].pending_orders;
      const alreadyAssigned = results[1][0].already_assigned;

      // If orders are already assigned, handle accordingly
      if (alreadyAssigned === 1) {
        return res.status(200).json({
          success: false,
          message: "Orders already assigned to this schedule.",
          alreadyAssigned: true,
        });
      }

      // Process assigned order IDs and return
      const assignedOrderIDs = results[0]
        ? results[0].map((row) => row.order_ID)
        : [];

      res.status(200).json({ success: true, pendingOrders, assignedOrderIDs });
    }
  );
});

export { router as truckScheduleRouter };
