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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import AnimatedProgressProvider from "./AnimatedProgressProvider";
import { easeQuadInOut } from "d3-ease";
import LinearProgress from "@mui/material/LinearProgress";

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
  const [filledPercentage, setFilledPercentage] = useState({});
  const [noOrdersDialogOpen, setNoOrdersDialogOpen] = useState(false); // State to control dialog
  const [capacityAlertOpen, setCapacityAlertOpen] = useState(false); // State to control capacity alert

  useEffect(() => {
    // Fetch all data on component mount
    const fetchData = async () => {
      try {
        // Fetch train schedule data
        const trainSchedule = await axios.get("http://localhost:5000/api/TrainSchedule");
        setRows(trainSchedule.data);
        setLoading(false);

        // Fetch pending orders
        const pendingOrdersData = await axios.get("http://localhost:5000/api/PendingOrders");
        setPendingOrders(pendingOrdersData.data);

        // Fetch city-train mapping
        const cityTrainMapping = await axios.get("http://localhost:5000/api/TrainCityMap");
        setCityTrainMap(cityTrainMapping.data);

        // Fetch available trains count
        const availableTrainsData = await axios.get("http://localhost:5000/api/AvailableTrainsCount");
        setAvailableTrainsCount(availableTrainsData.data);

        // Fetch filled percentages for each train
        const filledDataResponse = await axios.get("http://localhost:5000/api/TrainFilledPercentage");
        const filledData = filledDataResponse.data.reduce((acc, item) => {
          acc[item.train_ID] = item.filledPercentage;
          return acc;
        }, {});
        setFilledPercentage(filledData);

        // Log filled capacity of each train
        console.log("Filled Capacity of Each Train:", filledData); // Added console.log statement

      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
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
    setScheduledTrains((prev) => ({
      ...prev,
      [city]: false
    }));
  };

  const handleScheduleNow = (city) => {
    const trainId = selectedTrains[city];
    if (!trainId) return;

    if (!pendingOrders[city] || pendingOrders[city] === 0) {
      setNoOrdersDialogOpen(true); // Open the dialog if no pending orders
      return;
    }

    axios
      .post("http://localhost:5000/api/AssignOrders", { city, train_ID: trainId })
      .then(() => {
        setScheduledTrains((prev) => ({
          ...prev,
          [city]: true
        }));
        axios
          .get("http://localhost:5000/api/PendingOrders")
          .then((response) => {
            setPendingOrders(response.data);
          })
          .catch((error) => {
            console.error("Error fetching pending orders data", error);
          });
      })
      .catch((error) => {
        if (error.response && error.response.data.error === "No orders can be assigned to this train due to capacity constraints") {
          setCapacityAlertOpen(true); // Open the capacity alert dialog
        } else {
          console.error("Error assigning orders:", error);
        }
      });
  };

  const cities = ["Colombo", "Negombo", "Galle", "Matara", "Jaffna", "Trincomalee"];

  const formatTrainInfo = (train) => `Train ${train.train_ID} (${train.day} - ${train.time})`;

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
      {/* Dialog for No Pending Orders */}
      <Dialog
        open={noOrdersDialogOpen}
        onClose={() => setNoOrdersDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">No Pending Orders</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            There are no pending orders available.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNoOrdersDialogOpen(false)} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Capacity Alert */}
      <Dialog
        open={capacityAlertOpen}
        onClose={() => setCapacityAlertOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Capacity Alert</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            No orders can be assigned to this train due to capacity constraints.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCapacityAlertOpen(false)} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

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
                    {(value) => (
                      <CircularProgressbar
                        value={pendingOrders[city] || 0}
                        text={`${pendingOrders[city] || 0}`}
                        styles={buildStyles({
                          pathColor: `#F95454`,
                          textColor: "#F95454",
                          trailColor: "#d6d6d6",
                        })}
                      />
                    )}
                  </AnimatedProgressProvider>
                </div>
                <Typography style={{ marginTop: 10 }}>
                  Pending Orders: {pendingOrders[city] || 0}
                </Typography>

                <Typography variant="body2" style={{ marginTop: '15px', fontWeight: 'bold' }}>
                  Available Trains: {cityTrains.length}
                </Typography>
                {cityTrains.map((train) => (
                  <div key={train.train_ID} style={{ marginBottom: '15px', marginTop: '10px' }}>
                    <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                      Train {train.train_ID}
                    </Typography>
                    <div style={{ width: '100%', marginTop: 5 }}>
                      <LinearProgress
                        variant="determinate"
                        value={filledPercentage[train.train_ID] !== undefined ? filledPercentage[train.train_ID] : 0} // Use filledPercentage state for progress
                        sx={{
                          height: 10,
                          borderRadius: 5,
                          width: '100%',
                          backgroundColor: '#d6d6d6',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: '#3e98c7'
                          }
                        }}
                      />
                      <Typography variant="caption" style={{ textAlign: "right", display: "block", marginTop: 5 }}>
                        {filledPercentage[train.train_ID] !== undefined ? parseFloat(filledPercentage[train.train_ID]).toFixed(2) : 0 }% {/* Display filled percentage */}
                      </Typography>
                    </div>
                  </div>
                ))}


                <Select
                  value={selectedTrains[city] || ""}
                  onChange={(event) => handleTrainSelect(city, event.target.value)}
                  displayEmpty
                  style={{ marginTop: 10, width: "100%" }}
                >
                  <MenuItem value="" disabled>Select Train</MenuItem>
                  {cityTrains.map((train) => (
                    <MenuItem key={train.train_ID} value={train.train_ID}>
                      {formatTrainInfo(train)}
                    </MenuItem>
                  ))}
                </Select>
                <Tooltip title={pendingOrders[city] === 0 ? "No Pending Orders" : ""}>
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
                        textOverflow: 'ellipsis',
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