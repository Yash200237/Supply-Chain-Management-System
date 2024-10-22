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
        console.log("Customer Name:", result.data.customerName); // Check this again
        localStorage.setItem("customer_ID", result.data.customer_ID);
        localStorage.setItem("customerName", result.data.customerName); // Store the customer name
        navigate("/customerdashboard", { state: { customerName: result.data.customerName } });
      } else {
        setError(result.data.Error);
      }
    })
    .catch((err) => console.log(err));
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
