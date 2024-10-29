import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./TruckSchedule.css"; // Import the CSS file

const TruckSchedule = () => {
  const [drivers, setDrivers] = useState([]);
  const [driverAssistants, setDriverAssistants] = useState([]);
  const [trucks, setTrucks] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState("");
  const [selectedDriverAssistant, setSelectedDriverAssistant] = useState("");
  const [selectedTruck, setSelectedTruck] = useState("");
  const [selectedRoute, setSelectedRoute] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [recentSchedules, setRecentSchedules] = useState([]);
  const [isScheduledSuccessful, setIsScheduledSuccessful] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(null); // State to store feedback messages
  const [assignedOrders, setAssignedOrders] = useState({});
  const [pendingOrders, setPendingOrders] = useState({});
  const [assigned, setAssigned] = useState({});

  const [managerID] = useState(localStorage.getItem("manager_ID")); // Read `manager_ID` from localStorage on component mount

  const fetchRecentSchedules = useCallback(async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/recent-schedules",
        {
          params: { manager_ID: managerID },
        }
      );

      const schedules = res.data.schedules;

      // Update assigned state based on the `already_assigned` field
      const assignedStatus = {};
      const assignedOrdersList = {};
      schedules.forEach((schedule) => {
        assignedStatus[schedule.schedule_ID] = schedule.already_assigned === 1;
        if (schedule.already_assigned === 1) {
          assignedOrdersList[schedule.schedule_ID] =
            schedule.assignedOrderIDs || [];
        }
      });
      setRecentSchedules(schedules);
      setAssigned(assignedStatus);
      setAssignedOrders(assignedOrdersList);
    } catch (error) {
      console.error("Error fetching recent schedules:", error);
    }
  }, [managerID]);
  // Fetch schedules every minute to sync with backend cron job updates
  useEffect(() => {
    fetchRecentSchedules(); // Initial fetch
    const interval = setInterval(() => {
      fetchRecentSchedules();
    }, 20000); // 60000 ms = 1 minute

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [fetchRecentSchedules]);

  // Use one API call to fetch all schedule data
  useEffect(() => {
    // You should have the manager's city and store_ID saved from the login session
    const storedManagerStoreID = localStorage.getItem("managerStoreID");

    if (storedManagerStoreID) {
      const fetchScheduleData = async () => {
        try {
          const res = await axios.get(
            "http://localhost:5000/api/schedule-data",
            {
              params: {
                store_ID: storedManagerStoreID,
              },
            }
          );

          const { drivers, driverAssistants, trucks, routes } = res.data;

          setDrivers(drivers);
          setDriverAssistants(driverAssistants);
          setTrucks(trucks);
          setRoutes(routes);
        } catch (error) {
          console.error("Error fetching schedule data:", error);
        }
      };

      fetchScheduleData();
      fetchRecentSchedules(); // Fetch recent schedules on mount
    }
  }, [fetchRecentSchedules]); // Explicitly add `fetchRecentSchedules` to dependency array

  // Handle schedule creation
  const handleCreateSchedule = async () => {
    console.log("Selected Truck ID:", selectedTruck); // Check the ID being passed

    try {
      const res = await axios.post(
        "http://localhost:5000/api/create-schedule",
        {
          driver_ID: selectedDriver,
          driverA_ID: selectedDriverAssistant,
          truck_Id: selectedTruck,
          route_ID: selectedRoute,
          date: selectedDate,
          time: selectedTime,
          manager_ID: managerID,
        }
      );
      if (res.data.success) {
        setFeedbackMessage(null);
        setIsScheduledSuccessful(true);
        fetchRecentSchedules(); // Refresh schedule list after creation
      } else {
        setFeedbackMessage({ type: "error", text: res.data.message });
      }
    } catch (err) {
      console.error("Error creating schedule:", err);
    }
  };

  // Hide success message after a few seconds
  useEffect(() => {
    if (isScheduledSuccessful) {
      const timer = setTimeout(() => {
        setIsScheduledSuccessful(false);
      }, 3000); // Display the message for 3 seconds

      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [isScheduledSuccessful]);

  // Handle schedule completion
  const handleCompleteSchedule = async (schedule_ID) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/fix-schedule/${schedule_ID}`
      );
      if (res.data.success) {
        fetchRecentSchedules(); // Refresh the table after marking as completed
      }
    } catch (error) {
      console.error("Error updating schedule:", error);
    }
  };

  const handleAssignOrders = async (scheduleID) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/assign-orders/${scheduleID}`
      );
      if (response.data.alreadyAssigned) {
        // Disable the button and show a message
        setAssigned((prev) => ({ ...prev, [scheduleID]: true }));
      } else {
        const { pendingOrders, assignedOrderIDs } = response.data;

        // Update state to show assigned orders and pending orders
        setPendingOrders((prev) => ({
          ...prev,
          [scheduleID]: pendingOrders,
        }));
        setAssignedOrders((prev) => ({
          ...prev,
          [scheduleID]: assignedOrderIDs,
        }));
        setAssigned((prev) => ({ ...prev, [scheduleID]: true }));
      }
    } catch (error) {
      console.error("Error assigning orders:", error);
    }
  };

  return (
    <div className="truck-schedule-container">
      <h1>Truck Schedule</h1>
      <form className="truck-schedule-form">
        <div>
          <label>Driver:</label>
          <select
            value={selectedDriver}
            onChange={(e) => setSelectedDriver(e.target.value)}
          >
            <option value="">Select Driver</option>
            {drivers.map((driver) => (
              <option key={driver.driver_ID} value={driver.driver_ID}>
                {driver.first_name} {driver.last_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Driver Assistant:</label>
          <select
            value={selectedDriverAssistant}
            onChange={(e) => setSelectedDriverAssistant(e.target.value)}
          >
            <option value="">Select Assistant</option>
            {driverAssistants.map((assistant) => (
              <option key={assistant.driverA_ID} value={assistant.driverA_ID}>
                {assistant.first_name} {assistant.last_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Truck:</label>
          <select
            value={selectedTruck}
            onChange={(e) => setSelectedTruck(e.target.value)}
          >
            <option value="">Select Truck</option>
            {trucks.map((truck) => (
              <option key={truck.truck_Id} value={truck.truck_Id}>
                {truck.truck_plate_no}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Route:</label>
          <select
            value={selectedRoute}
            onChange={(e) => setSelectedRoute(e.target.value)}
          >
            <option value="">Select Route</option>
            {routes.map((route) => (
              <option key={route.route_ID} value={route.route_ID}>
                {route.path_description}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <div>
          <label>Time:</label>
          <input
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          />
        </div>

        {/* Centering the button using a div container */}
        <div className="truck-schedule-button-container">
          <button type="button" onClick={handleCreateSchedule}>
            Create Schedule
          </button>
        </div>

        {feedbackMessage && (
          <div className={`feedback-message`}>{feedbackMessage.text}</div>
        )}
      </form>

      {isScheduledSuccessful && (
        <div className="modal">
          <div className="modal-content">
            <h3>Scheduled Successfully!</h3>
          </div>
        </div>
      )}

      <h2>Recent Schedules</h2>
      <table className="schedule-table">
        <thead>
          <tr>
            <th>Schedule ID</th>
            <th>Driver</th>
            <th>Assistant</th>
            <th>Truck</th>
            <th>Route</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recentSchedules
            .slice()
            .reverse()
            .map((schedule) => (
              <tr key={schedule.schedule_ID}>
                <td>{schedule.schedule_ID}</td>
                <td>{`${schedule.driver_first_name} ${schedule.driver_last_name}`}</td>
                <td>{`${schedule.assistant_first_name} ${schedule.assistant_last_name}`}</td>
                <td>{schedule.truck_plate_no}</td>
                <td>{schedule.path_description}</td>
                <td>{schedule.date}</td>
                <td>{schedule.time}</td>
                <td>{schedule.status}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={schedule.status === "completed"}
                    disabled={schedule.status === "completed"}
                    onChange={() =>
                      handleCompleteSchedule(schedule.schedule_ID)
                    }
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="table-spacer"></div>

      <div className="schedule-grid-container">
        <table className="schedule-grid">
          <thead>
            <tr>
              <th>Schedule ID</th>
              <th>Assign Orders</th>
              <th>Assigned Orders</th>
              <th>Pending Orders</th>
            </tr>
          </thead>
          <tbody>
            {recentSchedules
              .slice()
              .reverse()
              .map((schedule) => (
                <tr key={schedule.schedule_ID}>
                  <td>{schedule.schedule_ID}</td>
                  <td>
                    <button
                      onClick={() => handleAssignOrders(schedule.schedule_ID)}
                      disabled={
                        assigned[schedule.schedule_ID] ||
                        schedule.status === "completed" ||
                        schedule.status === "on progress"
                      }
                    >
                      Assign Orders
                    </button>
                  </td>
                  <td>
                    {/* Dropdown to show assigned order IDs */}
                    {assignedOrders[schedule.schedule_ID] ? (
                      <select>
                        {assignedOrders[schedule.schedule_ID].map((orderID) => (
                          <option key={orderID} value={orderID}>
                            {orderID}
                          </option>
                        ))}
                      </select>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="pending-orders">
                    {pendingOrders[schedule.schedule_ID] !== undefined
                      ? pendingOrders[schedule.schedule_ID]
                      : "-"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default TruckSchedule;
