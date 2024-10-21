import express from "express";
import con from "../utils/db.js"; // Assuming this is your DB connection

const router = express.Router();

// Route: Checkout
router.post("/cart/checkout", (req, res) => {
  const { customer_ID, route_ID, cart } = req.body;

  if (!cart || cart.length === 0) {
    return res.status(400).json({ success: false, message: "Cart is empty" });
  }

  // Calculate total volume
  let total_volume = 0;

  const productPromises = cart.map((item) => {
    return new Promise((resolve, reject) => {
      con.query(
        "SELECT * FROM Product WHERE product_ID = ?",
        [item.product_ID],
        (err, result) => {
          if (err) reject(err);
          const product = result[0];
          total_volume += product.volume * item.quantity;
          resolve();
        }
      );
    });
  });

  Promise.all(productPromises)
    .then(() => {
      // Insert the order into the Order table
      const orderSql =
        "INSERT INTO `Order` (customer_ID, route_ID, status_ID, time, date, total_volume) VALUES (?, ?, ?, NOW(), CURDATE(), ?)";
      con.query(
        orderSql,
        [customer_ID, route_ID, 1, total_volume],
        (err, result) => {
          if (err)
            return res
              .status(500)
              .json({ success: false, message: "Order creation failed" });

          const order_ID = result.insertId;

          // Insert each product into the OrderProduct table
          const orderProductPromises = cart.map((item) => {
            const orderProductSql =
              "INSERT INTO OrderProduct (order_ID, product_ID, quantity) VALUES (?, ?, ?)";
            return new Promise((resolve, reject) => {
              con.query(
                orderProductSql,
                [order_ID, item.product_ID, item.quantity],
                (err) => {
                  if (err) reject(err);
                  resolve();
                }
              );
            });
          });

          Promise.all(orderProductPromises)
            .then(() => {
              res.json({
                success: true,
                message: "Checkout successful",
                order_ID,
              });
            })
            .catch((err) => {
              return res.status(500).json({
                success: false,
                message: "Failed to add products to order",
                error: err,
              });
            });
        }
      );
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve products",
        error: err,
      });
    });
});

export { router as cartRouter };
