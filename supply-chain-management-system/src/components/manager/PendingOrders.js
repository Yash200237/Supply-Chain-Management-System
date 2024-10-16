import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'; // Import MUI button
import { Link } from "react-router-dom";

function createData(orderId, purchasedDate, deliveryDate) {
  return { orderId, purchasedDate, deliveryDate };
}

const rows = [
  createData('ORD001', '2024-10-01', '2024-10-10'),
  createData('ORD002', '2024-10-03', '2024-10-12'),
  createData('ORD003', '2024-10-05', '2024-10-15'),
  createData('ORD004', '2024-10-07', '2024-10-17'),
  createData('ORD005', '2024-10-09', '2024-10-19'),
];

export default function PendingOrdersTable() {
  const handleRowClick = (orderId) => {
    // Perform any action here, such as navigation
    
    // You can use react-router-dom's useNavigate() to navigate to a different page
    // const navigate = useNavigate();
    // navigate(`/order-details/${orderId}`);
  };

  

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell align="right">Purchased Date</TableCell>
            <TableCell align="right">Estimated Delivery Date</TableCell>
            <TableCell align="right"></TableCell> {/* Add Actions column */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.orderId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }} // cursor changes to pointer
              onClick={() => handleRowClick(row.orderId)} // Row acts as a button
            >
              <TableCell component="th" scope="row">
                {row.orderId}
              </TableCell>
              <TableCell align="right">{row.purchasedDate}</TableCell>
              <TableCell align="right">{row.deliveryDate}</TableCell>
              <TableCell align="right">
              <Link to="/orderpriview" className="button-link">
                <Button
                  variant="contained"
                  color="primary"
                >
                PREVIEW
                </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
