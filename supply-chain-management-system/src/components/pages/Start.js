// Start.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Button, Paper, Typography, Divider } from "@mui/material";
import "./Start.css"; // Your custom CSS
import { Link } from "react-router-dom";
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

const Start = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider  class="loginPage" theme={theme}>
       <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="70vh"
        margin={"10vh"}
        bgcolor={"white"}
      
      > 
        <Paper elevation={10} sx={{pt:8,pb:5,pl:12,pr:12, width: 500, borderRadius: 3, height: 600, }} >
          <Typography variant="h4" align="center">
            Login
          </Typography>

          <Typography variant="subtitle1" align="center">
            Welcome, please log in to continue
          </Typography>

          <Divider sx={{ mt:5 }} />

          <Box display="flex" flexDirection="column" gap={2} mt={6}>
            <Button
              variant="contained"
              disableElevation
              onClick={() => navigate("/start/customerlogin")}
              fullWidth
            >
              Customer
            </Button>

            <Button
              variant="contained"
              disableElevation
              onClick={() => navigate("/start/driverlogin")}
              fullWidth
            >
              Driver/Driver Assistant
            </Button>

            <Button
              variant="contained"
              disableElevation
              onClick={() => navigate("/start/managerlogin")}
              fullWidth
            >
              Manager
            </Button>
              <Typography variant="subtitle1" align="center"   sx={{ mt: 10 }}>
            Don't have an account? Sign up first!
            </Typography>
            <Link to="/signup" className="button-link">
  <Button
    type="submit"
    variant="text" // Use "text" variant for styling the text only
    fullWidth
    sx={{ 
      mt: -9, 
      color: "none", // Blue color
      fontWeight: "bold", // Optional: Make the text bold
      '&:hover': { 
        backgroundColor: 'rgba(25, 118, 210, 0.1)' // Light blue hover effect
      }
    }}
  >
    Sign up
  </Button>
</Link>
          </Box>
        </Paper>
       </Box> 
    </ThemeProvider>
  );
};

export default Start;
