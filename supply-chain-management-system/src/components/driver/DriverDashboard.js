import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DriverDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [driverName, setDriverName] = useState("");

  useEffect(() => {
    // Check if driverName is passed via location.state
    if (location.state && location.state.driverName) {
      setDriverName(location.state.driverName);
      localStorage.setItem("driverName", location.state.driverName);
      console.log(
        "Driver name from location state:",
        location.state.driverName
      );
    } else {
      // If no driverName in location.state, check localStorage
      const storedDriverName = localStorage.getItem("driverName");
      if (storedDriverName) {
        setDriverName(storedDriverName);
        console.log("Driver name from localStorage:", storedDriverName);
      } else {
        // No driverName found, redirect to login
        console.log("No driver name found, redirecting to login...");
        navigate("/driverlogin");
      }
    }
  }, [location, navigate]);

  const handleOrderProducts = () => {
    navigate("/order-products");
  };

  const handleTrackDelivery = () => {
    navigate("/track-orders");
  };

  return (
    <div className="dashboard">
      <header>
        <h1>Welcome, {driverName || "Driver"}!</h1>
      </header>
      <div className="content-blocks">
        <div className="content-block order-products">
          <h2>Order Products</h2>
          <p>Browse our catalog and place orders for your favorite products.</p>
          <button className="button" onClick={handleOrderProducts}>
            Order Products
          </button>
        </div>
        <div className="content-block track-delivery">
          <h2>Track Delivery</h2>
          <p>Check the status of your orders and delivery timelines.</p>
          <button className="button" onClick={handleTrackDelivery}>
            Track Delivery
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
