import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const ManagerDashboard = ({ customerName }) => {
  const navigate = useNavigate(); // Use the navigate hook from React Router

  const handleOrderProducts = () => {
    navigate("/order-products"); // Navigate to the Order Products page
  };

  const handleTrackDelivery = () => {
    // Logic to track delivery (e.g., redirect to the tracking page)
    console.log("Track delivery button clicked");
  };

  return (
    <div className="dashboard">
      <header>
        <h1>Welcome, {customerName}!</h1>
      </header>
      <div className="content-blocks">
        <div className="content-block registration">
          <h2>Registration</h2>
          <p>Register Drivers and Assistant drivers</p>
          <Link to="/registration" className="button-link">
            <button className="button" onClick={handleTrackDelivery}>
              Register
            </button>
          </Link>
        </div>

        <div className="content-block train-schedule">
          <h2>Schedule Orders to Trains </h2>
          <p>Check train schedule and assign orders to trains</p>
          <Link to="/trainschedule" className="button-link">
            <button className="button" onClick={handleTrackDelivery}>
              Assign Orders
            </button>
          </Link>
        </div>

        <div className="content-block truck-schedule">
          <h2>Create Truck Schedules</h2>
          <p>Schedule trucks for order delivery.</p>
          <Link to="/truckschedule" className="button-link">
            <button className="button" onClick={handleTrackDelivery}>
              Schedule Trucks
            </button>
          </Link>
        </div>

        <div className="content-block reports">
          <h2>Reports</h2>
          <p>Sales reports, Working Hours reports, Customer-order reports</p>
          <Link to="/reports" className="button-link">
            <button className="button" onClick={handleTrackDelivery}>
              Generate Reports
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
