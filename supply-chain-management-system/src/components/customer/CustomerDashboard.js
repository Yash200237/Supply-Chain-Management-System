import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Customer.css";

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [customerName, setCustomerName] = useState("");

  useEffect(() => {
    // Check if customerName is passed via location.state
    if (location.state && location.state.customerName) {
      setCustomerName(location.state.customerName);
      localStorage.setItem("customerName", location.state.customerName);
      console.log("Customer name from location state:", location.state.customerName);
    } else {
      // If no customerName in location.state, check localStorage
      const storedCustomerName = localStorage.getItem("customerName");
      if (storedCustomerName) {
        setCustomerName(storedCustomerName);
        console.log("Customer name from localStorage:", storedCustomerName);
      } else {
        // No customerName found, redirect to login
        console.log("No customer name found, redirecting to login...");
        navigate("/customerlogin");
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
        <h1>Welcome, {customerName || "Customer"}!</h1>
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

export default CustomerDashboard;
