import React, { useState } from "react";
import {
  TextField,
  Box,
  Typography,
  Alert,
  Divider,
  Paper,
  Button,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    success: { main: "#2e7d32" },
    info: { main: "#0288d1" },
    background: { default: "#f5f5f5" },
  },
  typography: {
    h4: { fontWeight: 600, marginBottom: "5px" },
    subtitle1: { color: "#757575", fontSize: "0.9rem", marginBottom: "20px" },
  },
});

const CustomerLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  axios.defaults.withCredentials = true;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/start/customerlogin", formData)
      .then((result) => {
        if (result.data.loginStatus) {
          const { customer_ID, customerName, fullName, email, phoneNumber, address, city } = result.data;

          localStorage.setItem("customer_ID", customer_ID);
          localStorage.setItem("customerName", customerName);
          localStorage.setItem("fullName", fullName);
          localStorage.setItem("email", email);
          localStorage.setItem("phoneNumber", phoneNumber);
          localStorage.setItem("address", address);
          localStorage.setItem("city", city);

          navigate("/customerdashboard", { 
            state: { customerName, customer_ID, fullName, email, phoneNumber, address, city } 
          });
        } else {
          setError(result.data.Error || "Login failed. Please try again.");
        }
      })
      .catch(() => setError("An error occurred while logging in."));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
        sx={{ backgroundColor: theme.palette.background.default }}
      >
        <Paper elevation={4} sx={{ p: 4, width: 350, borderRadius: 3 }}>
          <Typography variant="h4" align="center">
            Login
          </Typography>

          <Typography variant="subtitle1" align="center">
            Welcome back! Please log in to continue
          </Typography>

          <Divider sx={{ my: 0 }} />

          {error && <Alert severity="error">{error}</Alert>}

          <Box
            component="form"
            onSubmit={handleSubmit}
            display="flex"
            flexDirection="column"
            gap={2}
            mt={2}
          >
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
            />

            {/* Login Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 1 }}
            >
              Log In
            </Button>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default CustomerLogin;
