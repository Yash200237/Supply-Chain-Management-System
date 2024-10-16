import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "trainNumber", label: "Train No.", minWidth: 170, align: "left" },
  { id: "capacity", label: "Capacity", minWidth: 220, align: "left" },
  {
    id: "from",
    label: "From",
    minWidth: 170,
    align: "left",
  },
  {
    id: "departureTime",
    label: "Departure Time",
    minWidth: 170,
    align: "left",
  },
  {
    id: "to",
    label: "To",
    minWidth: 170,
    align: "left",
  },
  {
    id: "arrivalTime",
    label: "Arrival Time",
    minWidth: 170,
    align: "left",
  },
];

function createData(
  trainNumber,
  capacity,
  from,
  departureTime,
  to,
  arrivalTime
) {
  return { trainNumber, capacity, from, departureTime, to, arrivalTime };
}

const rows = [
  createData("12345", 500, "Station A", "10:00 AM", "Station B", "12:00 PM"),
  createData("67890", 300, "Station C", "11:00 AM", "Station D", "1:30 PM"),
  createData("11223", 450, "Station E", "9:30 AM", "Station F", "11:45 AM"),
  createData("44556", 200, "Station G", "2:00 PM", "Station H", "4:30 PM"),
  createData("77889", 600, "Station I", "6:00 PM", "Station J", "8:45 PM"),
];

export default function TrainScheduleTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" colSpan={2}>
                Train Details
              </TableCell>
              <TableCell align="left" colSpan={4}>
                Schedule
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.trainNumber}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
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
    </Paper>
  );
}
