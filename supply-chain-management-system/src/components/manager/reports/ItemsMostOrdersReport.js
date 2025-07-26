import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ItemsMostOrdersReport.css"; // Import the CSS here

const ItemsMostOrdersReport = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [reportData, setReportData] = useState([]);
  const managerID = localStorage.getItem("manager_ID");

  const fetchReport = async () => {
    if (!managerID) {
      console.error("Manager ID is not available in localStorage.");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:5000/api/items-most-orders",
        {
          params: { manager_id: managerID, year, month },
        }
      );
      setReportData(response.data);
    } catch (error) {
      console.error("Error fetching report:", error);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [managerID, year, month]); // Automatically call fetchReport on dependency changes

  return (
    <div className="report-container">
      <h2>Items with Most Orders Report</h2>
      <div>
        <label>Year:</label>
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          {[2022, 2023, 2024].map((yr) => (
            <option key={yr} value={yr}>
              {yr}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Month:</label>
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
      </div>
      <button onClick={fetchReport}>Generate Report</button>

      {reportData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Order Count</th>
              <th>Total Quantity Ordered</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((item, index) => (
              <tr key={index}>
                <td>{item.ProductName}</td>
                <td>{item.OrderCount}</td>
                <td>{item.TotalQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available for the selected month and year.</p>
      )}
    </div>
  );
};

export default ItemsMostOrdersReport;
