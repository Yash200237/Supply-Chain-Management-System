import express from "express";
import con from "../utils/db.js"; // Import your database connection

const router = express.Router();

// Endpoint to get quarterly sales data
router.get("/reports/quarterly-sales", (req, res) => {
  const { year, quarter } = req.query;

  con.query(
    "CALL GetQuarterlySalesData(?, ?)",
    [year, quarter],
    (err, results) => {
      if (err) {
        console.error("Error fetching quarterly sales data:", err);
        return res.status(500).json({ error: "Database error" });
      }
      console.log("Stored procedure results:", results); // Log results to see if data is returned

      // The result is expected to be in the first set of results
      res.json(results[0]);
    }
  );
});

// Endpoint to get route-specific sales data
router.get("/reports/route-sales", (req, res) => {
  const { route_id, from_date, to_date } = req.query;
  console.log("Received parameters:", { route_id, from_date, to_date });

  con.query(
    "CALL GetRouteSpecificSales(?, ?, ?)",
    [route_id, from_date, to_date],
    (err, results) => {
      if (err) {
        console.error("Error fetching route-specific sales data:", err);
        return res.status(500).json({ error: "Database error" });
      }

      // The result is typically in the first set of results returned by a CALL
      res.json(results[0]);
    }
  );
});

// Endpoint to get routes by manager ID
router.get("/routes-by-manager/:managerID", (req, res) => {
  const { managerID } = req.params;

  // Query to get the routes associated with the manager's store
  const query = `
      SELECT r.route_ID, r.path_description 
      FROM Route r
      JOIN Store s ON r.store_ID = s.store_ID
      JOIN Manager m ON s.store_ID = m.store_ID
      WHERE m.manager_ID = ?;
    `;

  con.query(query, [managerID], (err, results) => {
    if (err) {
      console.error("Error fetching routes by manager ID:", err);
      return res.status(500).json({ error: "Database error" });
    }

    // Return routes if found, otherwise return an empty array
    res.json(results.length > 0 ? results : []);
  });
});

///////////////////////////////////////
router.get("/customer-orders", (req, res) => {
  const { customer_id } = req.query;

  const query = `
    SELECT product_ID, product_name, total_quantity_ordered
    FROM CustomerOrders
    WHERE customer_ID = ?;
  `;

  con.query(query, [customer_id], (err, results) => {
    if (err) {
      console.error("Error fetching customer orders:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

router.get("/product-customers", (req, res) => {
  const { product_id, manager_id } = req.query;

  const query = `
    SELECT DISTINCT customer_ID, first_name, last_name
    FROM ProductCustomersInCity
    WHERE product_ID = ? AND manager_ID = ?;
  `;

  con.query(query, [product_id, manager_id], (err, results) => {
    if (err) {
      console.error("Error fetching product customers:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// Endpoint to get customers in the manager's city using stored procedure
router.get("/customers", (req, res) => {
  const { manager_id } = req.query;

  // Call the stored procedure
  const query = `CALL GetCustomersInManagerCity(?)`;

  con.query(query, [manager_id], (err, results) => {
    if (err) {
      console.error("Error fetching customers in manager's city:", err);
      return res.status(500).json({ error: "Database error" });
    }

    // results[0] typically holds the data when using CALL with stored procedures
    res.json(results[0]);
  });
});

// Endpoint to get all products
router.get("/products", (req, res) => {
  const query = `
    SELECT product_ID, name FROM Product;
  `;

  con.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// Backend route to fetch items with most orders and total quantity
router.get("/items-most-orders", (req, res) => {
  const { manager_id, year, month } = req.query;

  const query = `
    SELECT ProductName, OrderCount, TotalQuantity
    FROM ItemsMostOrders
    WHERE manager_ID = ? AND OrderYear = ? AND OrderMonth = ?
    ORDER BY OrderCount DESC LIMIT 10;
  `;

  con.query(query, [manager_id, year, month], (err, results) => {
    if (err) {
      console.error("Error fetching items with most orders:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

export { router as reportRouter };
