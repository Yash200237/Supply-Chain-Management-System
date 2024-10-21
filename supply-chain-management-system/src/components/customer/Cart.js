import React, { useEffect, useState } from "react";
import "./Cart.css"; // Import your CSS for styling
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(""); // To store selected route
  const [customer_ID, setCustomerID] = useState(null); // Store the customer ID
  const navigate = useNavigate(); // For navigating post-checkout

  // Helper function to update localStorage
  const updateCartInLocalStorage = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    // Get cart items from localStorage
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart)); // Initialize cart from localStorage
    }

    // Fetch available routes from the backend
    axios
      .get("http://localhost:5000/routes") // Assuming this is the route to get routes
      .then((response) => {
        setRoutes(response.data.routes); // Set the available routes in state
      })
      .catch((error) => {
        console.error("Error fetching routes: ", error);
      });

    // Get customer_ID from local storage (after login)
    const storedCustomerID = localStorage.getItem("customer_ID");
    setCustomerID(storedCustomerID);
  }, []);

  const updateQuantity = (product_ID, quantity) => {
    const updatedCart = cart.map((item) =>
      item.product_ID === product_ID ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    updateCartInLocalStorage(updatedCart); // Update cart in localStorage
  };

  // Handle removing item from cart
  const removeFromCart = (product_ID) => {
    const updatedCart = cart.filter((item) => item.product_ID !== product_ID);
    setCart(updatedCart);
    updateCartInLocalStorage(updatedCart); // Update cart in localStorage
  };

  // Handle checkout
  const handleCheckout = () => {
    if (!selectedRoute) {
      alert("Please select a route for delivery");
      return;
    }

    const payload = {
      customer_ID,
      route_ID: selectedRoute,
      cart, // Send the cart from localStorage
    };

    axios
      .post("http://localhost:5000/cart/checkout", payload)
      .then((response) => {
        if (response.data.success) {
          alert("Checkout successful!");
          setCart([]); // Clear the cart after successful checkout
          localStorage.removeItem("cart"); // Clear the cart from localStorage
          navigate("/order-confirmation"); // Redirect to a confirmation page
        }
      })
      .catch((error) => console.error("Error during checkout:", error));
  };

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>
                    LKR{" "}
                    {typeof item.price === "number"
                      ? item.price.toFixed(2)
                      : "N/A"}
                  </td>
                  <td>{item.discount}%</td>
                  <td>
                    <input
                      type="number"
                      id={`quantity-${item.product_ID}`}
                      value={item.quantity}
                      min="1"
                      onChange={(e) =>
                        updateQuantity(
                          item.product_ID,
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => removeFromCart(item.product_ID)}
                      className="remove-button"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Route Selection */}
          <div className="route-selection">
            <label htmlFor="route">Select Route:</label>
            <select
              id="route"
              value={selectedRoute}
              onChange={(e) => setSelectedRoute(e.target.value)}
            >
              <option value="">--Select Route--</option>
              {routes.map((route) => (
                <option key={route.route_ID} value={route.route_ID}>
                  {route.name} (Distance: {route.distance} km)
                </option>
              ))}
            </select>
          </div>

          {/* Checkout Button */}
          <button onClick={handleCheckout} className="checkout-button">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};
export default Cart;
