import express from "express";
import con from "../utils/db.js"; // Import your database connection

const router = express.Router();

router.get("/products", (req, res) => {
  const sql = "SELECT * FROM Product";

  con.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching products from database: ", err);
      return res.status(500).json({ error: "Database error" });
    }
    return res.json({ products: results });
  });
});

export { router as productRouter };
