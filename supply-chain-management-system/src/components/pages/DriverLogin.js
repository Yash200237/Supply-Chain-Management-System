import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Divider,
} from "@mui/material";
import img1 from "../../images/logo2.png"; // Import your logo
import { blue } from "@mui/material/colors";

const DriverLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login form data:", formData);

    axios
      .post("http://localhost:5000/driverlogin", formData)
      .then((result) => {
        console.log("API Response:", result.data);
        if (result.data.loginStatus) {
          localStorage.setItem("driver_ID", result.data.driver_ID);
          localStorage.setItem("driverName", result.data.driverName);
          localStorage.setItem("token", result.data.token); // Store token
          localStorage.setItem("role", result.data.role);
          localStorage.setItem("email", result.data.email);

          navigate("/driverdashboard", {
            state: {
              driverName: result.data.driverName,
              driver_ID: result.data.driver_ID,
            },
          });
        } else {
          setError(result.data.Error);
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        setError("Login failed. Please check your credentials.");
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

        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 0 }}>
          Login
        </Typography>

        <Typography
          variant="subtitle1"
          align="center"
          sx={{ color: "text.secondary", mb: 2 }}
        >
          Welcome back, please login to continue
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
            sx={{
              mt: 2,
              backgroundColor: blue[600],
              "&:hover": {
                backgroundColor: blue[800],
              },
            }}
            style={{ backgroundColor:"#f85606" , color:"#fff" }}
          >
          
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default DriverLogin;
