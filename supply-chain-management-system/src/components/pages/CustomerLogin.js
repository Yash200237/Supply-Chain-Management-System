import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js"; // Import CryptoJS for hashing
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Divider,
} from "@mui/material";
import img1 from "../../images/logo2.png"; // Import the logo image

const CustomerLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const hashCustomerID = (customerID) =>
    CryptoJS.SHA256(String(customerID)).toString();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login form data:", formData);

    axios
      .post("http://localhost:5000/customerlogin", formData)
      .then((result) => {
        console.log("API Response:", result.data);
        if (result.data.loginStatus) {
          const token = result.data.token;
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
          const customerID = decodedToken.customer_ID;
          const hashedCustomerID = hashCustomerID(customerID);

          console.log("Customer ID:", customerID);
          console.log("Hashed customer ID:", hashedCustomerID);

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

          document.cookie = `token=${token}; path=/;`;

          localStorage.setItem("customer_ID", result.data.customer_ID);
          localStorage.setItem("role", result.data.role);
          localStorage.setItem("customerName", result.data.customerName);
          localStorage.setItem("fullName", result.data.fullName);
          localStorage.setItem("email", result.data.email);
          localStorage.setItem("phoneNumber", result.data.phoneNumber);
          localStorage.setItem("address", result.data.address);
          localStorage.setItem("city", result.data.city);

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
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
      bgcolor="white"

    >
      <Paper
        elevation={8}
        sx={{
          p: 4,
          width: 400,
          borderRadius: 3,
          backgroundColor: "#fff",
        }}
      >
        {/* Logo at the top center */}
        <Box display="flex" justifyContent="center" mb={2}>
          <img src={img1} alt="Logo" style={{ maxWidth: "80px", height: "60px" }} />
        </Box>

        <Typography 
        variant="h4" 
        align="center" 
        gutterBottom
        sx={{mb:0}}>
          Login
        </Typography>

        <Typography
          variant="subtitle1"
          align="center"
          sx={{ color: "text.secondary", mb: 2}}
        >
          Welcome, please login to continue
        </Typography>

        <Divider sx={{ my: 0 }} />

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Divider sx={{ mb: 3 }} />

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            required
            margin="none"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            margin="none"
            sx={{ mb: 2 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default CustomerLogin;
