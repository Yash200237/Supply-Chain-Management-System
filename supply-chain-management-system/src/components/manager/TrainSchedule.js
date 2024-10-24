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
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
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
  const [scheduledTrains, setScheduledTrains] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/TrainSchedule")
      .then((response) => {
        console.log("Train Data Response:", response.data); // Add this line
        setRows(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching train data", error);
        setLoading(false);
      });

    axios
      .get("http://localhost:5000/api/PendingOrders")
      .then((response) => {
        console.log("Pending Orders Response:", response.data);
        setPendingOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pending orders data", error);
      });

    axios
      .get("http://localhost:5000/api/TrainCityMap")
      .then((response) => {
        console.log("Train City Map Response:", response.data); // Add this line
        setCityTrainMap(response.data);
      })
      .catch((error) => {
        console.error("Error fetching city-train map data", error);
      });

    axios
      .get("http://localhost:5000/api/AvailableTrainsCount")
      .then((response) => {
        console.log("Available Trains Count Response:", response.data); // Add this line
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
    // Reset the scheduled state for this city when a new train is selected
    setScheduledTrains((prev) => ({
      ...prev,
      [city]: false
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
                    valueEnd={pendingOrders[city] || 0}
                    duration={1.4}
                    easingFunction={easeQuadInOut}
                  >
                    {(value) => {
                      return (
                        <CircularProgressbar
                          value={pendingOrders[city] || 0}
                          text={`${pendingOrders[city] || 0}`}
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
                  Pending Orders: {pendingOrders[city] || 0}
                </Typography>

                <Typography variant="body2" style={{ marginTop: '15px', fontWeight: 'bold' }}>
                  Available Trains: {cityTrains.length}
                </Typography>

                <Select
                  fullWidth
                  style={{ marginTop: '10px' }}
                  value={selectedTrains[city] || ''}
                  onChange={(e) => handleTrainSelect(city, e.target.value)}
                  displayEmpty
                  renderValue={(selected) => {
                    if (!selected) {
                      return "Select Train ID";
                    }
                    const selectedTrain = rows.find(train => train.train_ID === selected);
                    return selectedTrain ? formatTrainInfo(selectedTrain) : "Select Train ID";
                  }}
                >
                  {cityTrains.map((train) => (
                    <MenuItem key={train.train_ID} value={train.train_ID}>
                      {formatTrainInfo(train)}
                    </MenuItem>
                  ))}
                </Select>

                <Tooltip title={!selectedTrains[city] ? "Select a train before assigning orders" : ""}>
                  <span>
                    <Button
                      variant="contained"
                      style={{
                        marginTop: '15px',
                        backgroundColor: '#4F67ED',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                      onClick={() => handleScheduleNow(city)}
                      disabled={!selectedTrains[city]}
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