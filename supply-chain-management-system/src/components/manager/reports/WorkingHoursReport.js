// src/components/manager/reports/WorkingHoursReport.js

import React from "react";
import { useNavigate } from "react-router-dom";
import "./WorkingHoursReport.css"; // Ensure you create a CSS file for styling

const WorkingHoursReport = () => {
  const navigate = useNavigate();

  return (
    <div className="working-hours-container">
      <h2>Working Hours Reports</h2>
      <div className="working-hours-buttons">
        <button onClick={() => navigate("/working-hours/driverworkinghours")}>
          Driver Working Hours
        </button>
        <button onClick={() => navigate("/working-hours/driverassistantworkinghours")}>
          Assistant Working Hours
        </button>
        <button onClick={() => navigate("/working-hours/truckworkinghours")}>
          Truck Working Hours
        </button>
      </div>
    </div>
  );
};

export default WorkingHoursReport;
