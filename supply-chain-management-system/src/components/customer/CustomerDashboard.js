import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Customer.css";
import profilePicture from "../../images/profilepicture.jpg";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCity } from "react-icons/fa"; // Icons for style
//import { Margin } from "@mui/icons-material";

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Add states for customer details
  const [customerName, setCustomerName] = useState("");
  const [customer_ID, setCustomer_ID] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    console.log("Location state:", location.state);
    if (location.state) {
      const {
        customerName: name,
        customer_ID: id,
        fullName,
        email,
        phoneNumber,
        address,
        city,
      } = location.state;

      setCustomerName(name);
      setCustomer_ID(id);
      setFullName(fullName);
      setEmail(email);
      setPhoneNumber(phoneNumber);
      setAddress(address);
      setCity(city);

      localStorage.setItem("customerName", name);
      localStorage.setItem("customer_ID", id);
      localStorage.setItem("fullName", fullName);
      localStorage.setItem("email", email);
      localStorage.setItem("phoneNumber", phoneNumber);
      localStorage.setItem("address", address);
      localStorage.setItem("city", city);
    } else {
      const storedName = localStorage.getItem("customerName");
      const storedID = localStorage.getItem("customer_ID");
      const storedFullName = localStorage.getItem("fullName");
      const storedEmail = localStorage.getItem("email");
      const storedPhoneNumber = localStorage.getItem("phoneNumber");
      const storedAddress = localStorage.getItem("address");
      const storedCity = localStorage.getItem("city");

      if (
        storedName &&
        storedID &&
        storedFullName &&
        storedEmail &&
        storedPhoneNumber &&
        storedAddress &&
        storedCity
      ) {
        setCustomerName(storedName);
        setCustomer_ID(storedID);
        setFullName(storedFullName);
        setEmail(storedEmail);
        setPhoneNumber(storedPhoneNumber);
        setAddress(storedAddress);
        setCity(storedCity);
      } else {
        navigate("/customerlogin");
      }
    }
  }, [location, navigate]);

  const handleOrderProducts = () => {
    navigate("/order-products");
  };

  const handleTrackDelivery = () => {
    if (customer_ID) {
      navigate(`/track-orders/${customer_ID}`);
    } else {
      console.log("Customer ID not found.");
    }
  };

  return (
    <div className="dashboard" style={{ flex: "1" }}>
      
      <div className="dashboard-container">
        {/* Left side: Customer Details */}
        <div className="customer-details">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={profilePicture}
              alt="Customer Profile"
              className="profile-picture"
            />
            <h2>{fullName}</h2>
            <ul
              style={{
                textAlign: "left",
                listStyleType: "none",
                paddingLeft: "10px",
              }}
            >
              <li style={{ paddingBottom: "10px" }}>
                <FaEnvelope /> {email}
              </li>
              <li style={{ paddingBottom: "10px" }}>
                <FaPhone /> {phoneNumber}
              </li>
              <li style={{ paddingBottom: "10px" }}>
                <FaCity /> {city}
              </li>
              <li style={{ paddingBottom: "10px" }}>
                <FaMapMarkerAlt /> {address}
              </li>
            </ul>
          </div>
        </div>

        {/* Right side: Content */}
        <div className="content">
          <header>
            <h1>Welcome, {customerName || "Customer"}!</h1>
          </header>
          <div className="content-blocks">
            <div className="content-block order-products" style={{marginTop: "20px"}}>
              <h2>Order Products</h2>
              <p>
                Browse our catalog and place orders for your favorite products.
              </p>
              <button className="button" onClick={handleOrderProducts}>
                Order Products
              </button>
            </div>
            <div className="content-block track-delivery" style={{marginTop: "20px"}}>
              <h2>Track Delivery</h2>
              <p>Check the status of your orders and delivery timelines.</p>
              <button className="button" onClick={handleTrackDelivery}>
                Track Delivery
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;