import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button"; // Import Button component
import Tooltip from "@mui/material/Tooltip"; // Import Tooltip component
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import AnimatedProgressProvider from "./AnimatedProgressProvider";
import { easeQuadInOut } from "d3-ease";

const columns = [
  { id: "train_ID", label: "Train ID", minWidth: 170, align: "left" },
  { id: "time", label: "Time", minWidth: 220, align: "left" },
  { id: "day", label: "Day", minWidth: 170, align: "left" },
  { id: "capacity", label: "Capacity", minWidth: 170, align: "left" },
  { id: "destination", label: "Destination", minWidth: 170, align: "left" }
];

export default function TrainScheduleTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingOrders, setPendingOrders] = useState({});
  const [cityTrainMap, setCityTrainMap] = useState({});
  const [availableTrainsCount, setAvailableTrainsCount] = useState({});
  const [selectedTrains, setSelectedTrains] = useState({});
  const [scheduledTrains, setScheduledTrains] = useState({}); // New state for scheduled trains

  useEffect(() => {
    // Fetch train data from the backend
    axios
      .get("http://localhost:5000/api/Train")
      .then((response) => {
        setRows(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching train data", error);
        setLoading(false);
      });

    const simulatedPendingOrders = {
      Colombo: 25,
      Negombo: 45,
      Galle: 66,
      Matara: 33,
      Jaffna: 12,
      Trincomalee: 77
    };
    setPendingOrders(simulatedPendingOrders);

    // Fetch train IDs grouped by city from the backend
    axios
      .get("http://localhost:5000/api/TrainCityMap")
      .then((response) => {
        setCityTrainMap(response.data);
      })
      .catch((error) => {
        console.error("Error fetching city-train map data", error);
      });

    // Fetch available trains count for each city
    axios
      .get("http://localhost:5000/api/AvailableTrainsCount")
      .then((response) => {
        setAvailableTrainsCount(response.data);
      })
      .catch((error) => {
        console.error("Error fetching available trains count data", error);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleTrainSelect = (city, trainId) => {
    setSelectedTrains((prev) => ({
      ...prev,
      [city]: trainId
    }));
  };

  const handleScheduleNow = (city) => {
    setScheduledTrains((prev) => ({
      ...prev,
      [city]: true
    }));
  };

  const cities = ["Colombo", "Negombo", "Galle", "Matara", "Jaffna", "Trincomalee"];

  const formatTrainInfo = (train) => {
    return `Train ${train.train_ID} (${train.day} - ${train.time})`;
  };

  // Define custom background colors for each city
  const backgroundColors = {
    Colombo: '#f0e68c',
    Negombo: '#add8e6',
    Galle: '#90ee90',
    Matara: '#ffb6c1',
    Jaffna: '#ffebcd',
    Trincomalee: '#d3d3d3'
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <Typography variant="h2" align="center" style={{ margin: '20px 0' }}>
        Weekly Train Schedule
      </Typography>
      <TableContainer sx={{ maxHeight: 440, marginTop: 2 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 0, minWidth: column.minWidth, backgroundColor: '#fff', zIndex: 1 }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.train_ID}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Typography variant="h3" align="center" style={{ margin: '20px 0' }}>
        Assign pending orders to trains
      </Typography>
      
      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        {cities.map((city, index) => {
          const cityTrains = rows.filter(train => train.destination === city);
          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper style={{ padding: '20px', textAlign: 'center', backgroundColor: backgroundColors[city] }}>
                <Typography variant="h6">{city}</Typography>
                <div style={{ width: 100, height: 100, margin: "0 auto" }}>
                  <AnimatedProgressProvider
                    valueStart={0}
                    valueEnd={pendingOrders[city]}
                    duration={1.4}
                    easingFunction={easeQuadInOut}
                  >
                    {(value) => {
                      return (
                        <CircularProgressbar
                          value={pendingOrders[city]}
                          text={`${pendingOrders[city]}`}
                          styles={buildStyles({
                            pathTransition: "none",
                            textColor: "#f88",
                            pathColor: "#d33",
                            trailColor: "#eee"
                          })}
                        />
                      );
                    }}
                  </AnimatedProgressProvider>
                </div>
                <Typography variant="body1" style={{ marginTop: '10px' }}>
                  Pending Orders: {pendingOrders[city]}
                </Typography>

                {/* Move Available Trains Count here */}
                <Typography variant="body2" style={{ marginTop: '15px', fontWeight: 'bold' }}>
                  Available Trains: {cityTrains.length}
                </Typography>

                {/* Dropdown for Train IDs */}
                <Select
                  fullWidth
                  style={{ marginTop: '10px' }}
                  value={selectedTrains[city] || ''}
                  onChange={(e) => handleTrainSelect(city, e.target.value)}
                >
                  <MenuItem value="" disabled>Select Train ID</MenuItem>
                  {cityTrains.map((train) => (
                    <MenuItem key={train.train_ID} value={train.train_ID}>
                      {formatTrainInfo(train)}
                    </MenuItem>
                  ))}
                </Select>

                {/* Schedule Now Button with Tooltip */}
                <Tooltip title={!selectedTrains[city] ? "Select a train before assigning orders" : ""}>
                  <span>
                    <Button
                      variant="contained" // Use Material-UI's contained button style
                      style={{
                        marginTop: '15px',
                        backgroundColor: '#4F67ED', // Your specified color
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap', // Prevent text wrapping
                        overflow: 'hidden',    // Hide overflow
                        textOverflow: 'ellipsis' // Show ellipsis if text is too long
                      }}
                      onClick={() => handleScheduleNow(city)}
                      disabled={!selectedTrains[city]} // Disable if no train is selected
                    >
                      {scheduledTrains[city] ? "Assigned!" : "Assign Orders"}
                    </Button>
                  </span>
                </Tooltip>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
}