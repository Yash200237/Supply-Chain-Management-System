import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Cart.css"; // Import your CSS for styling

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [cartUpdated, setCartUpdated] = useState(false); // To trigger a re-fetch after updating the cart
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(""); // To store selected route
  const [customer_ID, setCustomerID] = useState(null); // Store the customer ID

  useEffect(() => {
    // Fetch cart items from the backend
    axios
      .get("http://localhost:5000/cart")
      .then((response) => {
        setCart(response.data.cart); // Set the fetched cart items in state
      })
      .catch((error) => {
        console.error("Error fetching cart: ", error);
      });
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
  }, [cartUpdated]);

  // Handle updating quantity
  const updateQuantity = (product_ID, quantity) => {
    axios
      .post("http://localhost:5000/cart/add", { product_ID, quantity })
      .then((response) => {
        setCartUpdated(!cartUpdated); // Trigger a re-fetch to update the cart
      })
      .catch((error) => {
        console.error("Error updating quantity: ", error);
      });
  };

  // Handle removing item from cart
  const removeFromCart = (product_ID) => {
    axios
      .post("http://localhost:5000/cart/remove", { product_ID })
      .then((response) => {
        setCartUpdated(!cartUpdated); // Trigger a re-fetch to update the cart
        window.dispatchEvent(
          new CustomEvent("productRemovedFromCart", { detail: product_ID })
        );
      })
      .catch((error) => {
        console.error("Error removing product: ", error);
      });
  };

  // Handle checkout
  const handleCheckout = () => {
    if (!selectedRoute) {
      alert("Please select a route for delivery");
      return;
    }

    axios
      .post("http://localhost:5000/cart/checkout", {
        customer_ID,
        route_ID: selectedRoute,
      })
      .then((response) => {
        if (response.data.success) {
          alert("Checkout successful!");
          setCart([]); // Clear the cart after successful checkout
        }
      })
      .catch((error) => {
        console.error("Error during checkout: ", error);
      });
  };

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <h2>{item.name}</h2>
              <p>Price: LKR {item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Volume: {item.volume}L</p>

              {/* Update quantity */}
              <label htmlFor={`quantity-${item.product_ID}`}>
                Update Quantity:
              </label>
              <input
                type="number"
                id={`quantity-${item.product_ID}`}
                value={item.quantity}
                min="1"
                onChange={(e) =>
                  updateQuantity(item.product_ID, parseInt(e.target.value))
                }
              />
              <button
                onClick={() => removeFromCart(item.product_ID)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          ))}

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
