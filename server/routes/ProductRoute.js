import express from "express";
import con from "../utils/db.js"; // Import your database connection
import fs from "fs";

const router = express.Router();
console.log(process.cwd());

router.get("/products", (req, res) => {
  const sql = "SELECT * FROM Product";

  con.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching products from database: ", err);
      return res.status(500).json({ error: "Database error" });
    }
    results = results.map((product) => {
      const productImage = fs.readFileSync(
        `./images/products/${product.product_ID}.jpg`
      );
      return {
        ...product,
        image: `data:image/jpeg;base64,${productImage.toString("base64")}`,
      };
    });
    return res.json({ products: results });
  });
});

export { router as productRouter };
