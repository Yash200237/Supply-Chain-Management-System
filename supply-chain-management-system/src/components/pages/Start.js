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
    h4: { fontWeight: 600, marginBottom: "10px" },
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
        minHeight="100vh"
        sx={{ backgroundColor: theme.palette.background.default }}
      >
        <Paper elevation={4} sx={{ p: 4, width: 350, borderRadius: 3 }}>
          <Typography variant="h4" align="center">
            Login As
          </Typography>
          <Divider sx={{ my: 2 }} />

          <Box display="flex" flexDirection="column" gap={2} mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/start/customerlogin")}
              fullWidth
            >
              Customer
            </Button>

            <Button
              variant="contained"
              color="success"
              onClick={() => navigate("/start/driverlogin")}
              fullWidth
            >
              Driver/Driver Assistant
            </Button>

            <Button
              variant="contained"
              color="info"
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
