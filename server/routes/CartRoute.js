import express from "express";
import cookieParser from "cookie-parser"; // To handle cookies
import con from "../utils/db.js"; // Assuming this is your DB connection

const router = express.Router();

// Middleware to parse cookies
router.use(cookieParser());

// Helper function to initialize the cart if it doesn't exist
function initializeCart(req, res, next) {
  if (!req.cookies.cart) {
    res.cookie("cart", JSON.stringify([])); // Initialize an empty cart in cookies
  }
  next();
}

// Route: Add Product to Cart
router.post("/cart/add", initializeCart, (req, res) => {
  const { product_ID, quantity } = req.body;

  // Retrieve the current cart from the cookies
  let cart = JSON.parse(req.cookies.cart);

  // Check if product is already in cart
  const productIndex = cart.findIndex((item) => item.product_ID === product_ID);

  if (productIndex !== -1) {
    // If product exists, update quantity
    cart[productIndex].quantity += quantity;
  } else {
    // If product does not exist, add it to the cart
    cart.push({ product_ID, quantity });
  }

  // Update the cart cookie
  res.cookie("cart", JSON.stringify(cart));

  res.json({ success: true, message: "Product added to cart", cart });
});

// Route: Remove Product from Cart
router.post("/cart/remove", initializeCart, (req, res) => {
  const { product_ID } = req.body;

  // Retrieve the current cart from the cookies
  let cart = JSON.parse(req.cookies.cart);

  // Filter out the product to remove
  cart = cart.filter((item) => item.product_ID !== product_ID);

  // Update the cart cookie
  res.cookie("cart", JSON.stringify(cart));

  res.json({ success: true, message: "Product removed from cart", cart });
});

// Route: View Cart
router.get("/cart", initializeCart, (req, res) => {
  // Retrieve the cart from cookies
  const cart = JSON.parse(req.cookies.cart);
  res.json({ success: true, cart });
});

// Route: Checkout
router.post("/cart/checkout", initializeCart, (req, res) => {
  const customer_ID = req.body.customer_ID;
  const route_ID = req.body.route_ID;
  const cart = JSON.parse(req.cookies.cart);

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
              // Clear the cart after successful checkout
              res.cookie("cart", JSON.stringify([]));
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
