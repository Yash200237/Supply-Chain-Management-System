import React from "react";
import "./Customer.css"; // Import your CSS for styling

// Sample product data
const products = [
  { name: "T-shirt", price: 2000.0, discount: 5, volume: 0.01 },
  { name: "Jeans", price: 5000.0, discount: 1, volume: 0.01 },
  { name: "Sneakers", price: 7500.0, discount: 8, volume: 0.02 },
  { name: "Backpack", price: 4500.0, discount: 2, volume: 0.02 },
  { name: "Sunglasses", price: 500.0, discount: 0, volume: 0.01 },
  { name: "Wristwatch", price: 3200.0, discount: 5, volume: 0.01 },
  { name: "Wallet", price: 2500.0, discount: 1, volume: 0.01 },
  { name: "Handbag", price: 5500.0, discount: 8, volume: 0.02 },
  { name: "Belt", price: 1800.0, discount: 5, volume: 0.01 },
  { name: "Cap", price: 1500.0, discount: 7, volume: 0.01 },
  { name: "Socks", price: 100.0, discount: 0, volume: 0.01 },
  { name: "Jacket", price: 1000.0, discount: 0, volume: 0.02 },
  { name: "Dress", price: 7000.0, discount: 2, volume: 0.02 },
  { name: "Blender", price: 9000.0, discount: 10, volume: 0.1 },
  { name: "Coffee Maker", price: 10000.0, discount: 15, volume: 0.1 },
  { name: "Toaster", price: 8000.0, discount: 10, volume: 0.08 },
  { name: "Iron", price: 4500.0, discount: 8, volume: 0.08 },
  { name: "Cookware Set", price: 12000.0, discount: 20, volume: 0.1 },
  { name: "Bath Towel", price: 2500.0, discount: 0, volume: 0.02 },
  { name: "Pillow", price: 3000.0, discount: 2, volume: 0.05 },
];

const ProductList = () => {
  const handleOrder = (productName) => {
    // Logic to handle ordering the product
    console.log(`Ordering ${productName}`);
  };

  return (
    <div className="product-list">
      <h1>Order Products</h1>
      <div className="products">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <h2>{product.name}</h2>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>Discount: {product.discount}%</p>
            <p>Volume: {product.volume}L</p>
            <button
              className="order-button"
              onClick={() => handleOrder(product.name)}
            >
              Order Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
