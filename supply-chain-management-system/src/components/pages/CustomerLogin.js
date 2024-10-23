import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CustomerLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

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
    axios
      .post("http://localhost:5000/start/customerlogin", formData)
      .then((result) => {
        console.log("API Response:", result.data); // Log the entire response object

        if (result.data.loginStatus) {
          // Store customer details in localStorage
          localStorage.setItem("customer_ID", result.data.customer_ID);
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
              city: result.data.city
            } 
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
