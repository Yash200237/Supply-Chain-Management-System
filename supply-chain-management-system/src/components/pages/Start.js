// Start.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Button, Paper, Typography, Divider } from "@mui/material";
import "./Start.css"; // Your custom CSS

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
            Welcome, please log in to continue
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Box display="flex" flexDirection="column" gap={2} mt={3}>
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
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default Start;
