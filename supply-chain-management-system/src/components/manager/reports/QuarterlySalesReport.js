// src/pages/QuarterlySalesReport.js
import React, { useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import "./QuarterlySalesReport.css";

// Register the elements with ChartJS
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const QuarterlySalesReport = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [quarter, setQuarter] = useState(1);
  const [chartData, setChartData] = useState(null);
  const [totalQuantity, setTotalQuantity] = useState(0); // New state for total quantity
  const [noDataMessage, setNoDataMessage] = useState(""); // Add state for no data message

  const handleGenerateReport = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/reports/quarterly-sales",
        {
          params: { year, quarter },
        }
      );
      const data = response.data;
      // Check if data contains expected structure
      if (!data || data.length === 0) {
        console.error("No data returned from API");
        setChartData(null);
        setNoDataMessage("No items sold this quarter"); // Set the no-data message
        return;
      }
      setNoDataMessage(""); // Clear the message if there is data

      const labels = data.map((item) => item.product_name);
      const quantities = data.map((item) => Number(item.total_quantity_sold));
      const totalQty = quantities.reduce((a, b) => a + b, 0);
      console.log("Total Quantity (sum of quantities):", totalQty);
      setTotalQuantity(totalQty); // Update totalQuantity state

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
      console.log("Chart Data:", { labels, quantities }); // Log chart data for troubleshooting
    } catch (error) {
      console.error("Error fetching quarterly sales data:", error);
      setNoDataMessage("Failed to fetch data. Please try again."); // Error message for failed fetch
    }
  };

  return (
    <div className="quarterly-sales-report">
      <h2>Quarterly Sales Report</h2>
      <div className="form-container">
        <label>Year:</label>
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          {[2022, 2023, 2024].map((yearOption) => (
            <option key={yearOption} value={yearOption}>
              {yearOption}
            </option>
          ))}
        </select>
        <label>Quarter:</label>
        <select value={quarter} onChange={(e) => setQuarter(e.target.value)}>
          {[1, 2, 3, 4].map((q) => (
            <option key={q} value={q}>
              Q{q}
            </option>
          ))}
        </select>
        <button className="generate-button" onClick={handleGenerateReport}>
          Generate Report
        </button>
      </div>

      {/* Conditionally render the message if there is no data */}
      {noDataMessage && <p className="no-data-message">{noDataMessage}</p>}

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
                  text: "Quarterly Sales Report",
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

export default QuarterlySalesReport;
