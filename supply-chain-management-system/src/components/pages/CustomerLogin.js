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
    return CryptoJS.SHA256(String(customerID)).toString(); // Ensure it's a string
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
    // Perform login logic here (e.g., API call)

    // Debugging step - ensure the login form data is correct
    console.log("Login form data:", formData);

    axios
      .post("http://localhost:5000/customerlogin", formData)
      .then((result) => {
        if (result.data.loginStatus) {
          const token = result.data.token;

          // Decode JWT to extract customer ID
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
          const customerID = decodedToken.customer_ID;
          const hashedCustomerID = hashCustomerID(customerID);
          console.log("Customer ID after login:", customerID);
          console.log("Hashed customer ID:", hashedCustomerID);

          // Check if there's an existing cart for this customer
          let storedCart = localStorage.getItem(`cart_${hashedCustomerID}`);
          if (!storedCart) {
            console.log(`Initialized a new cart for user: ${hashedCustomerID}`);
            // Initialize a new empty cart if none exists
            storedCart = [];
            localStorage.setItem(
              `cart_${hashedCustomerID}`,
              JSON.stringify(storedCart)
            );
            console.log(`Initialized a new cart for user: ${hashedCustomerID}`);
          } else {
            // Cart exists, load it from localStorage
            console.log("Cart loaded for user:", JSON.parse(storedCart));
          }

          // Save the new token in cookies
          document.cookie = `token=${token}; path=/;`;

          navigate("/customerdashboard");

          // Store customer details in localStorage
          localStorage.setItem("customer_ID", result.data.customer_ID);
          localStorage.setItem("role", result.data.role); // Store the role

          localStorage.setItem("customerName", result.data.customerName); // Store the customer name
          localStorage.setItem("fullName", result.data.fullName); // Full Name
          localStorage.setItem("email", result.data.email); // Email
          localStorage.setItem("phoneNumber", result.data.phoneNumber); // Phone Number
          localStorage.setItem("address", result.data.address); // Address
          localStorage.setItem("city", result.data.city); // City

          // Navigate to dashboard and pass state
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
        console.log(err);
        setError("An error occurred while logging in.");
      });
  };

  return (
    <div className="login">
      <div className="text-danger">{error && error}</div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default CustomerLogin;
