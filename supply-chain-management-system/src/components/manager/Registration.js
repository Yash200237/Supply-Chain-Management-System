import React, { useState } from "react";
import img1 from "../../images/logo2.png"; // Logo import
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
import "./Registration.css"; // Optional CSS for extra styling

// Custom Material UI Theme
const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    success: { main: "#2e7d32" },
    background: { default: "#f5f5f5" },
  },
  typography: {
    h4: { fontWeight: 600, marginBottom: "5px" },
    subtitle1: { color: "#757575", fontSize: "0.9rem", marginBottom: "20px" },
  },
});

const Registration = () => {
  const navigate = useNavigate();
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
    if (!formData.closestcity) newErrors.closestcity = "City is required.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    if (!formData.Type) newErrors.Type = "Employee type is required.";
    if (!formData.monthlysalary)
      newErrors.monthlysalary = "Monthly salary is required.";
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
      .post("http://localhost:5000/registration", formData)
      .then((res) => {
        if (res.data.signupStatus) {
          setSuccessMessage("Registration successful!");
          setErrors({});
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
          navigate("/login");
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
        minHeight="100vh"
        sx={{ backgroundColor: theme.palette.background.default }}
      >
        <Paper elevation={5} sx={{ p: 4, width: 400, borderRadius: 3 }}>
          <Box display="flex" justifyContent="center" mb={2}>
            <img src={img1} alt="Logo" style={{ maxWidth: "80px", height: "60px" }} />
          </Box>
          <Typography variant="h4" align="center">
            Registration
          </Typography>
          <Typography variant="subtitle1" align="center">
            Welcome! Please fill out the form to register.
          </Typography>
          <Divider sx={{ my: 2 }} />

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
            <FormControl fullWidth margin="normal" error={!!errors.closestcity}>
              <InputLabel>Closest City</InputLabel>
              <Select
                name="closestcity"
                value={formData.closestcity}
                onChange={handleChange}
              >
                <MenuItem value="">Select your closest city</MenuItem>
                {["Kandy", "Colombo", "Negombo", "Galle", "Matara", "Jaffna", "Trincomalee"].map(
                  (city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  )
                )}
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
            <FormControl fullWidth margin="normal" error={!!errors.Type}>
              <InputLabel>Type</InputLabel>
              <Select
                name="Type"
                value={formData.Type}
                onChange={handleChange}
              >
                <MenuItem value="">Select employee type</MenuItem>
                <MenuItem value="driver">Driver</MenuItem>
                <MenuItem value="driverassistant">Driver Assistant</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Monthly Salary"
              name="monthlysalary"
              type="number"
              value={formData.monthlysalary}
              onChange={handleChange}
              error={!!errors.monthlysalary}
              helperText={errors.monthlysalary}
              fullWidth
              margin="normal"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              style={{ backgroundColor:"#f85606" , color:"#fff" }}
            >
              Register
            </Button>
          </form>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default Registration;
