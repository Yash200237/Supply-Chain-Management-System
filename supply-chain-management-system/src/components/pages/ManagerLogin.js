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
import { orange } from "@mui/material/colors";

const ManagerLogin = () => {
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
      .post("http://localhost:5000/managerlogin", formData)
      .then((result) => {
        console.log("API Response:", result.data);
        if (result.data.loginStatus) {
          localStorage.setItem("manager_ID", result.data.manager_ID);
          localStorage.setItem("managerName", result.data.managerName);
          localStorage.setItem("fullName", result.data.fullName);
          localStorage.setItem("email", result.data.email);
          localStorage.setItem("phoneNumber", result.data.phoneNumber);
          localStorage.setItem("city", result.data.city);
          localStorage.setItem("managerStoreID", result.data.store_ID);
          localStorage.setItem("role", result.data.role);

          navigate("/managerdashboard", {
            state: {
              managerName: result.data.managerName,
              manager_ID: result.data.manager_ID,
              fullName: result.data.fullName,
              email: result.data.email,
              phoneNumber: result.data.phoneNumber,
              city: result.data.city,
              store_ID: result.data.store_ID,
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

        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 0 }}>
          Login
        </Typography>

        <Typography
          variant="subtitle1"
          align="center"
          sx={{ color: "text.secondary", mb: 2 }}
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
            sx={{
              mt: 2,
              backgroundColor: orange[600],
              "&:hover": {
                backgroundColor: orange[800],
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

export default ManagerLogin;
