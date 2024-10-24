import express from "express";
import authenticateToken from "./jwtMiddleware.js"; // Import the middleware
import con from "../utils/db.js"; // Assuming this is your DB connection

const router = express.Router();

// Fetch routes for the store in the customer's city using the stored procedure
router.get("/routes", authenticateToken, (req, res) => {
  const customerID = req.customer_ID;

  const procedureCall = "CALL GetRoutesForCustomerCity(?)";

  con.query(procedureCall, [customerID], (err, result) => {
    if (err) {
      console.error("Error executing stored procedure: ", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json({ routes: result[0] }); // result[0] contains the result set from the stored procedure
  });
});

// Route: Checkout using the stored procedure
router.post("/checkout", authenticateToken, (req, res) => {
  const customerID = req.customer_ID; // Extracted from JWT middleware
  const { route_ID, cart } = req.body; // Cart is sent from the front-end

  // Add logging to check if the payload is received correctly
  console.log("Checkout Payload:", req.body);
  console.log("Customer ID:", customerID);
  console.log("Route ID:", route_ID);
  console.log("Cart:", cart);

  if (!cart || cart.length === 0) {
    return res.status(400).json({ success: false, message: "Cart is empty" });
  }

  // Calculate total volume for the order
  let total_volume = 0;
  cart.forEach((item) => {
    total_volume += item.volume * item.quantity;
  });

  // Convert cart to a JSON string to pass to the stored procedure
  const cartJSON = JSON.stringify(cart);

  // Call the stored procedure
  const procedureCall = "CALL InsertOrderAndProducts(?, ?, ?, ?)";
  con.query(
    procedureCall,
    [customerID, route_ID, total_volume, cartJSON],
    (err, result) => {
      if (err) {
        console.error("Error executing stored procedure: ", err);
        return res.status(500).json({
          success: false,
          message: "Database error during order creation",
        });
      }

      res.json({
        success: true,
        message: "Checkout successful",
        order_ID: result[0].insertId, // Use the generated order ID from the procedure
      });
    }
  );
});

export { router as cartRouter };
