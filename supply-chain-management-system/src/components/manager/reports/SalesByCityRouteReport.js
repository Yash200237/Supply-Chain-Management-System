import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import "./SalesByCityRouteReport.css";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const SalesByCityRouteReport = () => {
  const [availableRoutes, setAvailableRoutes] = useState([]);
  const [routeId, setRouteId] = useState("");
  const [fromYear, setFromYear] = useState(new Date().getFullYear());
  const [fromMonth, setFromMonth] = useState(1);
  const [toYear, setToYear] = useState(new Date().getFullYear());
  const [toMonth, setToMonth] = useState(12);
  const [chartData, setChartData] = useState(null);
  const [noDataMessage, setNoDataMessage] = useState("");
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    // Step 1: Retrieve manager_ID from localStorage
    const managerID = localStorage.getItem("manager_ID");

    // Step 2: Fetch routes based on manager_ID
    const fetchRoutes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/routes-by-manager/${managerID}`
        );
        setAvailableRoutes(response.data); // Set routes for manager's store
      } catch (error) {
        console.error("Error fetching routes:", error);
        setNoDataMessage("Failed to fetch routes. Please try again.");
      }
    };

    if (managerID) {
      fetchRoutes(); // Only fetch if managerID exists
    } else {
      setNoDataMessage("Manager not found. Please log in.");
    }
  }, []);

  const handleGenerateReport = async () => {
    try {
      const fromDate = `${fromYear}-${String(fromMonth).padStart(2, "0")}-01`;
      const toDate = `${toYear}-${String(toMonth).padStart(2, "0")}-01`;

      const response = await axios.get(
        "http://localhost:5000/api/reports/route-sales",
        {
          params: { route_id: routeId, from_date: fromDate, to_date: toDate },
        }
      );

      const data = response.data;
      console.log("Route sales data:", data);

      if (!data || data.length === 0) {
        setChartData(null);
        setNoDataMessage("No items sold for the selected route and date range");
        return;
      }
      setNoDataMessage("");

      const labels = data.map((item) => item.name);
      const quantities = data.map((item) => Number(item.total_quantity_sold));
      const totalQty = quantities.reduce((a, b) => a + b, 0);
      setTotalQuantity(totalQty);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Products Sold",
            data: quantities,
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
              "#FF9F40",
              "#8E44AD",
              "#3498DB",
              "#1ABC9C",
              "#2ECC71",
              "#F1C40F",
              "#E74C3C",
              "#D35400",
              "#9B59B6",
              "#34495E",
              "#95A5A6",
              "#7F8C8D",
              "#16A085",
              "#27AE60",
              "#2980B9",
            ],
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching route sales data:", error);
      setNoDataMessage("Failed to fetch data. Please try again.");
    }
  };

  return (
    <div className="route-sales-report">
      <h2>Route-Specific Sales Report</h2>
      <div className="form-container">
        <label>Route:</label>
        <select value={routeId} onChange={(e) => setRouteId(e.target.value)}>
          <option value="">Select a route</option>
          {availableRoutes.map((route) => (
            <option key={route.route_ID} value={route.route_ID}>
              {route.path_description}
            </option>
          ))}
        </select>

        <label>From Year:</label>
        <select value={fromYear} onChange={(e) => setFromYear(e.target.value)}>
          {[2022, 2023, 2024].map((yearOption) => (
            <option key={yearOption} value={yearOption}>
              {yearOption}
            </option>
          ))}
        </select>
        <label>From Month:</label>
        <select
          value={fromMonth}
          onChange={(e) => setFromMonth(e.target.value)}
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
            <option key={month} value={month}>
              {new Date(0, month - 1).toLocaleString("default", {
                month: "long",
              })}
            </option>
          ))}
        </select>

        <label>To Year:</label>
        <select value={toYear} onChange={(e) => setToYear(e.target.value)}>
          {[2022, 2023, 2024].map((yearOption) => (
            <option key={yearOption} value={yearOption}>
              {yearOption}
            </option>
          ))}
        </select>
        <label>To Month:</label>
        <select value={toMonth} onChange={(e) => setToMonth(e.target.value)}>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
            <option key={month} value={month}>
              {new Date(0, month - 1).toLocaleString("default", {
                month: "long",
              })}
            </option>
          ))}
        </select>

        <button onClick={handleGenerateReport}>Generate Report</button>
      </div>

      {noDataMessage && <p>{noDataMessage}</p>}

      {chartData && (
        <div className="chart-container">
          <Pie
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Route Sales Report",
                },
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => {
                      const label = tooltipItem.label || "";
                      const quantity = tooltipItem.raw || 0;
                      const percentage = (
                        (quantity / totalQuantity) *
                        100
                      ).toFixed(2);
                      return `${label}: ${quantity} (${percentage}%)`;
                    },
                  },
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SalesByCityRouteReport;
