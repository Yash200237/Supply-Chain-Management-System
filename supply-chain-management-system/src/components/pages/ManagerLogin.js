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
        console.log(result.data.loginStatus);
        if (result.data.loginStatus) {
          console.log("Manager Name:", result.data.managerName); // Check this again
          localStorage.setItem("manager_ID", result.data.manager_ID);
          localStorage.setItem("managerName", result.data.managerName); // Store the manager name
          localStorage.setItem("role", result.data.role); // Store the role
          localStorage.setItem("managerStoreID", result.data.store_ID);

          navigate("/managerdashboard", {
            state: {
              managerName: result.data.managerName,
              store_ID: result.data.store_ID,
            },
          });
        } else {
          setError(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <div className="text-danger">{error && error}</div>
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

export default ManagerLogin;
