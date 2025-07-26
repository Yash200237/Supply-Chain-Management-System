// src/components/manager/reports/DriverAssistantWorkingHoursReport.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import "./DriverAWorkingHoursReport.css"; // Create a new CSS file for this component

// Register components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DriverAssistantWorkingHoursReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchDriverAssistantWorkingHours();
  }, [filter]);

  const fetchDriverAssistantWorkingHours = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (filter) {
        if (!isNaN(filter)) {
          params.append("driverA_ID", filter);
        } else {
          params.append("driverA_name", filter);
        }
      }

      const response = await axios.get(
        `http://localhost:5000/api/reports/workinghours/driverassistantworkinghoursreport?${params.toString()}`
      );
      setData(response.data);
    } catch (err) {
      setError("Error fetching data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Prepare data for chart
  const chartData = {
    labels: data.map((entry) => entry.driverA_name),
    datasets: [
      {
        label: "Weekly Hours",
        data: data.map((entry) => parseFloat(entry.weekly_hours)),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="report-container">
      <h2>Driver Assistant Working Hours</h2>
      <div className="filter-container">
        <label htmlFor="filter">Filter by Assistant ID or Name:</label>
        <input
          id="filter"
          type="text"
          placeholder="Enter Assistant ID or Name"
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
            <table className="assistant-table">
              <thead>
                <tr>
                  <th>Assistant ID</th>
                  <th>Assistant Name</th>
                  <th>Weekly Hours</th>
                </tr>
              </thead>
              <tbody>
                {data.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.driverA_ID}</td>
                    <td>{entry.driverA_name}</td>
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

export default DriverAssistantWorkingHoursReport;
