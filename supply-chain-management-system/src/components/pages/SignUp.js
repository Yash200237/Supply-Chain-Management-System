import React, { useState } from "react";
import "./SignUp.css"; // Assuming you'll create a CSS file for styling
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    address: "",
    closestcity: "",
    phone: "",
    customerType: "",
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
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.closestcity) newErrors.closestcity = "City is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.customerType)
      newErrors.customerType = "Customer type is required";

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
        .post("http://localhost:5000/auth/signup", formData)
        .then((res) => {
          if (res.data.signupStatus) {
            // If signup is successful, display success message and reset the form
            console.log("Signup data:", formData);
            setSuccessMessage("Signup successful!");
            setFormData({
              firstname: "",
              lastname: "",
              username: "",
              email: "",
              password: "",
              address: "",
              closestcity: "",
              phone: "",
              customerType: "",
            });
            navigate("/start/customerlogin");
          }
        })
        .catch((err) => {
          // Check if the error response from the backend contains an error message
          if (err.response && err.response.data && err.response.data.Error) {
            setErrors({ form: err.response.data.Error });
          } else {
            setErrors({
              signupError:
                "An unexpected error occurred during signup. Please try again later.",
            });
          }
          setSuccessMessage(""); // Clear success message if there's an error
        });
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errors.form && <p style={{ color: "red" }}>{errors.form}</p>}
      {errors.signupError && (
        <p style={{ color: "red" }}>{errors.signupError}</p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
          {errors.firstname && (
            <span className="error">{errors.firstname}</span>
          )}
        </div>
        <div>
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
          {errors.lastname && <span className="error">{errors.lastname}</span>}
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
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
          {errors.email && <span className="error">{errors.email}</span>}
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
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>

        <div>
          <label htmlFor="closestcity">Closest City:</label>
          <select
            id="closestcity"
            name="closestcity"
            value={formData.closestcity}
            onChange={handleChange}
            required
          >
            <option value="">Select your closest city</option>{" "}
            {/* Default option */}
            <option value="Kandy">Kandy</option>
            <option value="Colombo">Colombo</option>
            <option value="Negombo">Negombo</option>
            <option value="Galle">Galle</option>
            <option value="Matara">Matara</option>
            <option value="Jaffna">Jaffna</option>
            <option value="Trincomalee">Trincomalee</option>
          </select>
          {errors.city && <span className="error">{errors.city}</span>}
        </div>

        <div>
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        <div>
          <label htmlFor="customerType">Customer Type:</label>
          <select
            id="customerType"
            name="customerType"
            value={formData.customerType}
            onChange={handleChange}
            required
          >
            <option value="">Select customer type</option>{" "}
            {/* Default option */}
            <option value="retailer">Retailer</option>
            <option value="wholesaler">Wholesaler</option>
            <option value="end customer">End Customer</option>
          </select>
          {errors.customerType && (
            <span className="error">{errors.customerType}</span>
          )}
        </div>

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
