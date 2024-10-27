import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Tracking = () => {
  const { customer_ID } = useParams(); 
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/track/${customer_ID}`);
      setOrders(response.data); 
      setError("");
    } catch (err) {
      console.error("Error fetching orders:", err.response ? err.response.data : err.message);
      setError("Error fetching orders. Please try again.");
    }
  };

  useEffect(() => {
    fetchOrders(); 
  }, [customer_ID]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", minHeight: "100vh-80px"}}>
      <h1 style={{ color: "#333", textAlign: "center"}}>Your Orders</h1>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message if any */}
      
      {orders.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th style={{ padding: "10px", border: "1px solid #ddd", textAlign: "left" }}>Purchased Date</th>
              <th style={{ padding: "10px", border: "1px solid #ddd", textAlign: "left" }}>Route</th>
              <th style={{ padding: "10px", border: "1px solid #ddd", textAlign: "left" }}>Products</th>
              <th style={{ padding: "10px", border: "1px solid #ddd", textAlign: "left" }}>Total Price</th>
              <th style={{ padding: "10px", border: "1px solid #ddd", textAlign: "left" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.order_ID}>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{new Date(order['Purchased Date']).toLocaleDateString()}</td> {/* Format the date */}
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{order.Route}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{order.Products}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>LKR {order['Total Price']}</td> 
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{order.Status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found for this customer.</p>
      )}
    </div>
  );
};

export default Tracking;
