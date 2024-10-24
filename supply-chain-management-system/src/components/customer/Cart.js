import React, { useEffect, useState } from "react";
import "./Cart.css"; // Import your CSS for styling
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(""); // To store selected route
  const [isConfirming, setIsConfirming] = useState(false); // To control the pop-up confirmation
  const [isCheckoutSuccessful, setIsCheckoutSuccessful] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper to retrieve token from cookies
  const getTokenFromCookies = () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    return token ? token.split("=")[1] : null;
  };

  // Trigger the confirmation modal
  const triggerConfirmation = () => {
    if (!selectedRoute) {
      alert("Please select a route for delivery.");
      return;
    }

    setIsConfirming(true); // Show confirmation modal
  };

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

    // Fetch available routes from the backend (JWT is stored in cookies)
    axios
      .get("http://localhost:5000/cart/routes", {
        headers: {
          Authorization: `Bearer ${getTokenFromCookies()}`, // Fetch JWT token from cookies
        },
      })
      .then((response) => {
        setRoutes(response.data.routes); // Set the available routes in state
      })
      .catch((error) => {
        console.error("Error fetching routes: ", error);
      });
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

  // Calculate the total bill and enrich cart with calculated values (discounted price and total per item)
  const enrichedCart = cart.map((item) => {
    const discountedPrice = item.price - item.price * (item.discount / 100);
    const total = discountedPrice * item.quantity;
    return { ...item, discountedPrice, total };
  });

  // Calculate the total bill by summing the total for each item
  const totalBill = enrichedCart.reduce((acc, item) => acc + item.total, 0);

  // Handle the actual checkout process after confirmation
  const handleCheckoutConfirmation = async () => {
    console.log("Checkout button clicked"); // Add this line to verify the function is triggered

    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true); // Disable the button once submitted

    const token = getTokenFromCookies();

    if (!token) {
      alert("You need to login to proceed with the checkout.");
      setIsSubmitting(false);
      return;
    }

    if (!selectedRoute) {
      alert("Please select a route for delivery.");
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        route_ID: selectedRoute,
        cart,
      };

      console.log("Payload before sending to backend:", payload); // Add this line to verify payload is prepared

      const checkoutResponse = await axios.post(
        "http://localhost:5000/cart/checkout",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (checkoutResponse.data.success) {
        setIsCheckoutSuccessful(true); // Show success modal
        // Delay clearing the cart and removing from local storage to allow success message display
        setTimeout(() => {
          setCart([]); // Clear cart after success message is shown
          localStorage.removeItem("cart"); // Remove cart from local storage
          setIsSubmitting(false);
        }, 3000); // Delay of 3 seconds before clearing the cart
      } else {
        console.error("Checkout failed: ", checkoutResponse.data.message);
        alert("Checkout failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("There was an error during checkout. Please try again.");
    } finally {
      setIsSubmitting(false);
      setIsConfirming(false); // Close confirmation modal
    }
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
                <th>Discounted Unit Price</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {enrichedCart.map((item, index) => (
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
                  {/* Display discounted price */}
                  <td>
                    LKR{" "}
                    {typeof item.discountedPrice === "number"
                      ? item.discountedPrice.toFixed(2)
                      : "N/A"}
                  </td>
                  {/* Display total (discounted price * quantity) */}
                  <td>
                    LKR{" "}
                    {typeof item.total === "number"
                      ? item.total.toFixed(2)
                      : "N/A"}
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

          {/* Display the total bill */}
          <div className="total-bill">
            <h2>Total Bill: LKR {totalBill.toFixed(2)}</h2>
          </div>

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
                  {route.path_description}
                </option>
              ))}
            </select>
          </div>

          {/* Display the checkout confirmation modal */}
          {isConfirming && (
            <div className="modal">
              <div className="modal-content">
                <h3>Confirm Transaction</h3>
                <p>Are you sure you want to confirm the transaction?</p>
                <button onClick={handleCheckoutConfirmation}>Confirm</button>
                <button onClick={() => setIsConfirming(false)}>Cancel</button>
              </div>
            </div>
          )}

          {isCheckoutSuccessful && (
            <div className="modal">
              <div className="modal-content">
                <h3>Checkout Successful!</h3>
                <p>Your order has been placed successfully.</p>
              </div>
            </div>
          )}
          {/* Checkout Button */}
          <button onClick={triggerConfirmation} className="checkout-button">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
