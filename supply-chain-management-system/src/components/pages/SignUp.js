import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Alert,
  Divider,
  Paper,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
import "./SignUp.css"; // Custom CSS for additional styling if needed

// Define a custom Material UI theme
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
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstname) newErrors.firstname = "First name is required.";
    if (!formData.lastname) newErrors.lastname = "Last name is required.";
    if (!formData.username) newErrors.username = "Username is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (!formData.address) newErrors.address = "Address is required.";
    if (!formData.closestcity) newErrors.closestcity = "City is required.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    if (!formData.customerType) newErrors.customerType = "Customer type is required.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage("");
      return;
    }

    axios
      .post("http://localhost:5000/auth/signup", formData)
      .then((res) => {
        if (res.data.signupStatus) {
          setSuccessMessage("Signup successful!");
          setErrors({});
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
        const errorMsg = err.response?.data?.Error || "An unexpected error occurred.";
        setErrors({ form: errorMsg });
        setSuccessMessage("");
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="130vh"
        sx={{ backgroundColor: theme.palette.background.default }}
        gap={2} mt={0}
      >
        <Paper elevation={5} sx={{ p: 4, width: 400, borderRadius: 3 }}>
          <Typography variant="h4" align="center">
            Sign up
          </Typography>

          <Typography variant="subtitle1" align="center">
            Welcome, please sign up to continue
          </Typography>

          <Divider sx={{ my: 0 }} />

          {successMessage && <Alert severity="success">{successMessage}</Alert>}
          {errors.form && <Alert severity="error">{errors.form}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              error={!!errors.firstname}
              helperText={errors.firstname}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Last Name"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              error={!!errors.lastname}
              helperText={errors.lastname}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
              fullWidth
              margin="normal"
            />

            <FormControl fullWidth margin="normal" error={!!errors.closestcity}>
              <InputLabel>Closest City</InputLabel>
              <Select
                name="closestcity"
                value={formData.closestcity}
                onChange={handleChange}
              >
                <MenuItem value="">Select your closest city</MenuItem>
                {["Kandy", "Colombo", "Negombo", "Galle", "Matara", "Jaffna", "Trincomalee"].map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
              fullWidth
              margin="normal"
            />

            <FormControl fullWidth margin="normal" error={!!errors.customerType}>
              <InputLabel>Customer Type</InputLabel>
              <Select
                name="customerType"
                value={formData.customerType}
                onChange={handleChange}
              >
                <MenuItem value="">Select customer type</MenuItem>
                <MenuItem value="retailer">Retailer</MenuItem>
                <MenuItem value="wholesaler">Wholesaler</MenuItem>
                <MenuItem value="end customer">End Customer</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              variant="text" // Use "text" variant to allow only the text color to change
              fullWidth
              sx={{ 
                mt: 1, 
                color: "#1976d2", // Set blue color to text
                fontWeight: "bold", // Optional: Make the text bold
                '&:hover': { 
                  backgroundColor: 'rgba(25, 118, 210, 0.1)' // Add light blue hover effect
                }
              }}
            >
              Sign up
            </Button>
          </form>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default Signup;
