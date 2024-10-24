import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DriverLogin = () => {
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
    .post("http://localhost:5000/start/driverlogin", formData)
    .then((result) => {
      console.log("API Response:", result.data); // Log the entire response object
      console.log(result.data.loginStatus);
      if (result.data.loginStatus) {
        console.log("Driver Name:", result.data.driverName); // Check this again
        localStorage.setItem("driver_ID", result.data.driver_ID);
        localStorage.setItem("driverName", result.data.driverName); // Store the driver name
        navigate("/driverdashboard", { state: { driverName: result.data.driverName } });
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

export default DriverLogin;
