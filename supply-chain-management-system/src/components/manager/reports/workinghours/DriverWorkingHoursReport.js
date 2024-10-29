// src/components/manager/reports/DriverWorkingHoursReport.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import "./DriverWorkingHoursReport.css";

// Register components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DriverWorkingHoursReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchDriverWorkingHours();
  }, [filter]);

  const fetchDriverWorkingHours = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (filter) {
        if (!isNaN(filter)) {
          params.append("driver_ID", filter);
        } else {
          params.append("driver_name", filter);
        }
      }

      const response = await axios.get(
        `http://localhost:5000/api/reports/workinghours/driverworkinghoursreport?${params.toString()}`
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
    labels: data.map((entry) => entry.driver_name),
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
      <h2>Driver Working Hours</h2>
      <div className="filter-container">
        <label htmlFor="filter">Filter by Driver ID or Name:</label>
        <input
          id="filter"
          type="text"
          placeholder="Enter Driver ID or Name"
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
            <table className="driver-table">
              <thead>
                <tr>
                  <th>Driver ID</th>
                  <th>Driver Name</th>
                  <th>Weekly Hours</th>
                </tr>
              </thead>
              <tbody>
                {data.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.driver_ID}</td>
                    <td>{entry.driver_name}</td>
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

export default DriverWorkingHoursReport;
