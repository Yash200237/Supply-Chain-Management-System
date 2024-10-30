import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js"; // Import CryptoJS for hashing

const CustomerLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  // Helper to hash the customer ID
  const hashCustomerID = (customerID) => {
    return CryptoJS.SHA256(String(customerID)).toString();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login form data:", formData); // Debugging

    axios
      .post("http://localhost:5000/customerlogin", formData)
      .then((result) => {
        console.log("API Response:", result.data); // Debugging API response
        if (result.data.loginStatus) {
          const token = result.data.token;

          // Decode JWT to extract customer ID
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
          const customerID = decodedToken.customer_ID;
          const hashedCustomerID = hashCustomerID(customerID);
          console.log("Customer ID:", customerID);
          console.log("Hashed customer ID:", hashedCustomerID);

          // Check or initialize the customer's cart in localStorage
          let storedCart = localStorage.getItem(`cart_${hashedCustomerID}`);
          if (!storedCart) {
            console.log(`Initialized a new cart for user: ${hashedCustomerID}`);
            storedCart = [];
            localStorage.setItem(
              `cart_${hashedCustomerID}`,
              JSON.stringify(storedCart)
            );
          } else {
            console.log("Cart loaded:", JSON.parse(storedCart));
          }

          // Set the token in cookies
          document.cookie = `token=${token}; path=/;`;

          // Store customer details in localStorage
          localStorage.setItem("customer_ID", result.data.customer_ID);
          localStorage.setItem("role", result.data.role);
          localStorage.setItem("customerName", result.data.customerName);
          localStorage.setItem("fullName", result.data.fullName);
          localStorage.setItem("email", result.data.email);
          localStorage.setItem("phoneNumber", result.data.phoneNumber);
          localStorage.setItem("address", result.data.address);
          localStorage.setItem("city", result.data.city);

          // Navigate to the dashboard with state
          navigate("/customerdashboard", {
            state: {
              customerName: result.data.customerName,
              customer_ID: result.data.customer_ID,
              fullName: result.data.fullName,
              email: result.data.email,
              phoneNumber: result.data.phoneNumber,
              address: result.data.address,
              city: result.data.city,
            },
          });
        } else {
          setError(result.data.Error);
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        setError("An error occurred while logging in.");
      });
  };

  return (
    <div
      className="login"
      style={{
        maxWidth: "400px",
        margin: "109px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div
        className="text-danger"
        style={{ color: "red", marginBottom: "10px" }}
      >
        {error && error}
      </div>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        Login
      </h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="email"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="password"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default CustomerLogin;
