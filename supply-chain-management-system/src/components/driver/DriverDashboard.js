import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DriverDashboard = ({ customerName }) => {
  const navigate = useNavigate(); // Use the navigate hook from React Router
  const [driverDetails, setDriverDetails] = useState(null);
  const [workingHours, setWorkingHours] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch driver details and working hours
    axios
      .get("http://localhost:5000/driver/dashboard", { withCredentials: true })
      .then((response) => {
        setDriverDetails(response.data.driverDetails);
        setWorkingHours(response.data.workingHours);
      })
      .catch((err) => {
        setError(err.response ? err.response.data.message : "Error fetching data");
      });
  }, []);

  const handleOrderProducts = () => {
    navigate("/order-products"); // Navigate to the Order Products page
  };

  const handleTrackDelivery = () => {
    // Logic to track delivery (e.g., redirect to the tracking page)
    console.log("Track delivery button clicked");
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100">
        <div className="bg-red-500 text-white p-4 rounded shadow-md">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!driverDetails || !workingHours) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-lg font-semibold text-gray-500">Loading...</div>
      </div>
    );
  }

  // Data for the bar chart
  const data = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    datasets: [
      {
        label: "Working Hours",
        data: [
          workingHours.monday_hours,
          workingHours.tuesday_hours,
          workingHours.wednesday_hours,
          workingHours.thursday_hours,
          workingHours.friday_hours,
          workingHours.saturday_hours,
        ],
        backgroundColor: [
          "#3498db", // blue
          "#2ecc71", // green
          "#e74c3c", // red
          "#f1c40f", // yellow
          "#9b59b6", // purple
          "#e67e22", // orange
        ],
        borderColor: "#34495e",
        borderWidth: 1,
      },
    ],
  };

  // Options for the bar chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Weekly Working Hours',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Driver Dashboard</h2>
        <div className="border-t border-gray-200 mt-4 pt-4">
          <p className="text-lg text-gray-700 mb-2">
            <strong className="text-indigo-600">Name:</strong> {driverDetails.username}
          </p>
          <p className="text-lg text-gray-700">
            <strong className="text-indigo-600">ID:</strong> {driverDetails.driver_ID}
          </p>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 text-center mb-4">
            Weekly Working Hours
          </h3>
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
