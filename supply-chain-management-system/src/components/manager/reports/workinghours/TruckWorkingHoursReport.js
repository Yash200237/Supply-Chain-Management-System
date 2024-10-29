// src/components/manager/reports/TruckWorkingHoursReport.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import "./TruckWorkingHoursReport.css";

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TruckWorkingHoursReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchTruckWorkingHours();
  }, [filter]);

  const fetchTruckWorkingHours = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (filter) {
        if (!isNaN(filter)) {
          params.append("truck_id", filter);
        } else {
          params.append("truck_plate_no", filter);
        }
      }

      const response = await axios.get(
        `http://localhost:5000/api/reports/workinghours/truckworkinghoursreport?${params.toString()}`
      );
      setData(response.data);
    } catch (err) {
      setError("Error fetching data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Chart data preparation
  const chartData = {
    labels: data.map((entry) => entry.truck_plate_no),
    datasets: [
      {
        label: "Weekly Hours",
        data: data.map((entry) => parseFloat(entry.weekly_hours)),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="report-container">
      <h2>Truck Working Hours</h2>
      <div className="filter-container">
        <label htmlFor="filter">Filter by Truck ID or Plate Number:</label>
        <input
          id="filter"
          type="text"
          placeholder="Enter Truck ID or Plate Number"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <div className="table-container">
            <table className="truck-table">
              <thead>
                <tr>
                  <th>Truck ID</th>
                  <th>Plate Number</th>
                  <th>Weekly Hours</th>
                </tr>
              </thead>
              <tbody>
                {data.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.truck_Id}</td>
                    <td>{entry.truck_plate_no}</td>
                    <td>{parseFloat(entry.weekly_hours).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="chart-container">
            <Bar data={chartData} options={{ responsive: true }} />
          </div>
        </>
      )}
    </div>
  );
};

export default TruckWorkingHoursReport;
