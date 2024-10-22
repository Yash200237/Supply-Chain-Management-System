import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Customer.css";

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [customerName, setCustomerName] = useState("");
  const [customer_ID, setCustomer_customer_ID] = useState(""); // Add state for customer _customer_ID

  useEffect(() => {
    // Check if customerName is passed via location.state
    if (location.state && location.state.customerName) {
      setCustomerName(location.state.customerName);
      localStorage.setItem("customerName", location.state.customerName);
    } else {
      // If no customerName in location.state, check localStorage
      const storedCustomerName = localStorage.getItem("customerName");
      if (storedCustomerName) {
        setCustomerName(storedCustomerName);
      } else {
        // No customerName found, redirect to login
        console.log("No customer name found, redirecting to login...");
        navigate("/customerlogin");
      }
    }

    // Get customer _customer_ID from location.state or localStorage
    if (location.state && location.state.customer_ID) {
      setCustomer_customer_ID(location.state.customer_ID);
      localStorage.setItem("customer_ID", location.state.customer_ID);
    } else {
      const storedCustomer_customer_ID = localStorage.getItem("customer_ID");
      if (storedCustomer_customer_ID) {
        setCustomer_customer_ID(storedCustomer_customer_ID);
      }
    }
  }, [location, navigate]);

  const handleOrderProducts = () => {
    navigate("/order-products");
  };

  const handleTrackDelivery = () => {
    if (customer_ID) {
      navigate(`/track-orders/${customer_ID}`); // Navigate using the actual customer _customer_ID
    } else {
      console.log("Customer _customer_ID not found.");
    }
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
