import React, { useState } from "react";
import axios from "axios";

const Registration = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    closestcity: "",
    phone: "",
    Type: "",
    monthlysalary: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstname) newErrors.firstname = "First name is required";
    if (!formData.lastname) newErrors.lastname = "Last name is required";
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.closestcity) newErrors.closestcity = "City is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.Type) newErrors.Type = "Employee type is required";
    if (!formData.monthlysalary) newErrors.monthlysalary = "Monthly salary is required";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage("");
    } else {
      setErrors({});
      axios
        .post("http://localhost:5000/registration", formData)
        .then((res) => {
          if (res.data.signupStatus) {
            setSuccessMessage("Registration successful!");
            setFormData({
              firstname: "",
              lastname: "",
              username: "",
              email: "",
              password: "",
              closestcity: "",
              phone: "",
              Type: "",
              monthlysalary: "",
            });
          }
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.Error) {
            setErrors({ form: err.response.data.Error });
          } else {
            setErrors({ signupError: "An unexpected error occurred during signup. Please try again later." });
          }
          setSuccessMessage("");
        });
    }
  };

  return (
    <div
      className="signup-container"
      style={{
        maxWidth: "500px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>Registration</h2>
      {successMessage && <p style={{ color: "green", marginBottom: "10px" }}>{successMessage}</p>}
      {errors.form && <p style={{ color: "red" }}>{errors.form}</p>}
      {errors.signupError && <p style={{ color: "red" }}>{errors.signupError}</p>}

      <form onSubmit={handleSubmit}>
        {[
          { label: "First Name", id: "firstname", type: "text" },
          { label: "Last Name", id: "lastname", type: "text" },
          { label: "Username", id: "username", type: "text" },
          { label: "Email", id: "email", type: "email" },
          { label: "Password", id: "password", type: "password" },
          { label: "Phone Number", id: "phone", type: "text" },
          { label: "Monthly Salary", id: "monthlysalary", type: "number" },
        ].map((field) => (
          <div key={field.id} style={{ marginBottom: "15px" }}>
            <label htmlFor={field.id} style={{ display: "block", marginBottom: "5px" }}>
              {field.label}:
            </label>
            <input
              type={field.type}
              id={field.id}
              name={field.id}
              value={formData[field.id]}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
            />
            {errors[field.id] && <span style={{ color: "red", fontSize: "12px" }}>{errors[field.id]}</span>}
          </div>
        ))}

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="closestcity" style={{ display: "block", marginBottom: "5px" }}>
            Closest City:
          </label>
          <select
            id="closestcity"
            name="closestcity"
            value={formData.closestcity}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
          >
            <option value="">Select the closest city</option>
            <option value="Kandy">Kandy</option>
            <option value="Colombo">Colombo</option>
            <option value="Negombo">Negombo</option>
            <option value="Galle">Galle</option>
            <option value="Matara">Matara</option>
            <option value="Jaffna">Jaffna</option>
            <option value="Trincomalee">Trincomalee</option>
          </select>
          {errors.closestcity && <span style={{ color: "red", fontSize: "12px" }}>{errors.closestcity}</span>}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="Type" style={{ display: "block", marginBottom: "5px" }}>
            Type:
          </label>
          <select
            id="Type"
            name="Type"
            value={formData.Type}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
          >
            <option value="">Select employee type</option>
            <option value="driver">Driver</option>
            <option value="driverassistant">Driver Assistant</option>
          </select>
          {errors.Type && <span style={{ color: "red", fontSize: "12px" }}>{errors.Type}</span>}
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
          Register
        </button>
      </form>
    </div>
  );
};

export default Registration;
