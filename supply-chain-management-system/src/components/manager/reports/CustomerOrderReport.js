// src/pages/CustomerOrderReport.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CustomerOrderReport.css";

const CustomerOrderReport = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [customerOrders, setCustomerOrders] = useState([]);
  const [productCustomers, setProductCustomers] = useState([]);
  const [noDataMessage, setNoDataMessage] = useState("");

  useEffect(() => {
    // Fetch customers and products to populate dropdowns
    const fetchCustomersAndProducts = async () => {
      const managerID = localStorage.getItem("manager_ID"); // Get manager ID from local storage

      try {
        const [customerResponse, productResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/customers", {
            params: { manager_id: managerID },
          }),
          axios.get("http://localhost:5000/api/products"),
        ]);
        console.log("Customer response:", customerResponse.data); // Log data for debugging
        console.log("Product response:", productResponse.data); // Log data for debugging

        setCustomers(
          Array.isArray(customerResponse.data) ? customerResponse.data : []
        );
        // Update this line to access the `products` property within `productResponse.data`
        setProducts(
          Array.isArray(productResponse.data.products)
            ? productResponse.data.products
            : []
        );
      } catch (error) {
        console.error("Error fetching customers or products:", error);
        setCustomers([]); // Fallback to empty array
        setProducts([]); // Fallback to empty array
      }
    };

    fetchCustomersAndProducts();
  }, []);

  const handleCustomerSelection = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/customer-orders",
        {
          params: { customer_id: selectedCustomer },
        }
      );
      setCustomerOrders(response.data);
      setNoDataMessage(
        response.data.length ? "" : "No orders found for this customer."
      );
    } catch (error) {
      console.error("Error fetching customer orders:", error);
      setNoDataMessage("Failed to fetch customer orders.");
    }
  };

  const handleProductSelection = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/product-customers",
        {
          params: {
            product_id: selectedProduct,
            manager_id: localStorage.getItem("manager_ID"),
          },
        }
      );
      setProductCustomers(response.data);
      setNoDataMessage(
        response.data.length
          ? ""
          : "No customers found for this product in the manager's city."
      );
    } catch (error) {
      console.error("Error fetching product customers:", error);
      setNoDataMessage("Failed to fetch product customers.");
    }
  };

  return (
    <div className="report-container">
      <h2>Customer-Order Report</h2>

      <div className="selection-section">
        <div className="form-section">
          <label>Select Customer:</label>
          <select
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
          >
            <option value="">Select a customer</option>
            {customers.map((customer) => (
              <option key={customer.customer_ID} value={customer.customer_ID}>
                {customer.first_name} {customer.last_name}{" "}
                {customer.customer_type}
              </option>
            ))}
          </select>
          <button onClick={handleCustomerSelection}>View Orders</button>
        </div>

        <div className="form-section">
          <label>Select Product:</label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.product_ID} value={product.product_ID}>
                {product.name}
              </option>
            ))}
          </select>
          <button onClick={handleProductSelection}>View Customers</button>
        </div>
      </div>

      <div className="reports-section">
        <div className="report">
          {customerOrders.length > 0 && (
            <>
              <h3>Products Ordered by Selected Customer</h3>
              <ul>
                {customerOrders.map((order) => (
                  <li key={order.product_ID}>
                    {order.product_name} - Quantity:{" "}
                    {order.total_quantity_ordered}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="report">
          {productCustomers.length > 0 && (
            <>
              <h3>Customers Who Ordered Selected Product</h3>
              <ul>
                {productCustomers.map((customer) => (
                  <li key={customer.customer_ID}>
                    {customer.first_name} {customer.last_name}
                    {customer.customer_type}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      {noDataMessage && <p className="no-data-message">{noDataMessage}</p>}
    </div>
  );
};

export default CustomerOrderReport;
