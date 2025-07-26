// src/pages/Reports.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Reports.css";

const Reports = () => {
  const navigate = useNavigate();

  return (
    <div className="reports-container">
      <h1>Generate Reports</h1>
      <div className="reports-buttons">
        <button onClick={() => navigate("/quarterly-sales-report")}>
          Quarterly Sales Report
        </button>
        <button onClick={() => navigate("/items-most-orders")}>
          Items with Most Orders
        </button>
        <button onClick={() => navigate("/sales-by-city-route")}>
          Sales Report by Cities and Routes
        </button>
        <button onClick={() => navigate("/working-hours")}>
          Working Hours
        </button>
        <button onClick={() => navigate("/customer-order-report")}>
          Customer Order Report
        </button>
      </div>
    </div>
  );
};

export default Reports;
