import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManagerLogin = () => {
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
      .post("http://localhost:5000/managerlogin", formData)
      .then((result) => {
        console.log("API Response:", result.data); // Log the entire response object
        
          if (result.data.loginStatus) {
          // Store manager details in localStorage
          localStorage.setItem("manager_ID", result.data.manager_ID);
          localStorage.setItem("managerName", result.data.managerName); // Store the customer name
          localStorage.setItem("fullName", result.data.fullName); // Full Name
          localStorage.setItem("email", result.data.email); // Email
          localStorage.setItem("phoneNumber", result.data.phoneNumber); // Phone Number
          localStorage.setItem("city", result.data.city); // City

          // Navigate to dashboard and pass state
          navigate("/managerdashboard", { state: { 
            managerName: result.data.managerName,
            manager_ID: result.data.manager_ID,
            fullName: result.data.fullName,
            email: result.data.email,
            phoneNumber: result.data.phoneNumber,
            city: result.data.city
          }  });
        } else {
          setError(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{height: "100vh-80px"}}>
      <div className="login" style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "5px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)", backgroundColor: "#f9f9f9" , minHeight: "100vh-80px"}}>
        <div className="text-danger" style={{ color: "red", marginBottom: "10px" }}>{error && error}</div>
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="password" style={{ display: "block", marginBottom: "5px" }}>Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
            />
          </div>
          <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px" }}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default ManagerLogin;