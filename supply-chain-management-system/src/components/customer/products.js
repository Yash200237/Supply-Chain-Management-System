import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js"; // Import CryptoJS for hashing

import "./Customer.css"; // Import your CSS for styling

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [cart, setCart] = useState([]); // To keep track of items in the cart
  const navigate = useNavigate(); // Hook to navigate to cart

  // Fetch products from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products") // Call the API endpoint
      .then((response) => {
        setProducts(response.data.products); // Set the fetched products in state
        const initialQuantities = {};
        response.data.products.forEach((product) => {
          initialQuantities[product.product_ID] = 1; // Default quantity is 1
        });
        setQuantities(initialQuantities);
      })
      .catch((error) => {
        console.error("Error fetching products: ", error);
      });

    // Load cart from local storage on mount using customer-specific key
    const token = getTokenFromCookies();
    if (!token) {
      console.error("User not logged in");
      return;
    }

    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const customerID = decodedToken.customer_ID;
    const hashedCustomerID = hashCustomerID(customerID);
    const storedCart = localStorage.getItem(`cart_${hashedCustomerID}`);

    if (storedCart) {
      setCart(JSON.parse(storedCart)); // Load the correct cart
    } else {
      setCart([]); // If no cart, start with an empty one
    }
  }, []);

  // Handle quantity change
  const handleQuantityChange = (product_ID, newQuantity) => {
    setQuantities({
      ...quantities,
      [product_ID]: newQuantity,
    });
  };
  // Helper to get customer ID from JWT stored in cookies
  const getTokenFromCookies = () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    return token ? token.split("=")[1] : null;
  };

  // Helper to hash the customer ID
  const hashCustomerID = (customerID) => {
    return CryptoJS.SHA256(String(customerID)).toString(); // Hash the customer ID
  };

  // Handle the ordering process and store in local storage
  const handleOrder = (product) => {
    const { product_ID, price } = product;
    const quantity = quantities[product_ID];

    // Check if product is already in the cart
    const existingProduct = cart.find((item) => item.product_ID === product_ID);

    // If the product already exists, update its quantity; otherwise, add new product
    let updatedCart;
    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item.product_ID === product_ID
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          price: Number(price), // Ensure price is stored as a number
          quantity,
          discount: product.discount,
        },
      ];
    }
    // Get customer ID from JWT
    const token = getTokenFromCookies();
    if (!token) {
      console.error("Customer is not logged in");
      return;
    }
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const customerID = decodedToken.customer_ID;

    // Hash the customer ID to create the unique cart key
    const cartKey = `cart_${hashCustomerID(customerID)}`;

    // Update local storage and state
    setCart(updatedCart);
    localStorage.setItem(cartKey, JSON.stringify(updatedCart)); // <-- Store cart with the hashed customer-specific key
  };
  // Check if product is already in the cart
  const isInCart = (product_ID) => {
    return cart.some((item) => item.product_ID === product_ID);
  };

  // Navigate to cart page
  const goToCart = () => {
    navigate("/cart");
  };

  return (
    <div className="product-list">
      <div className="product-list-header">
        <h1>Order Products</h1>
        {/* Cart Icon */}
        <FontAwesomeIcon
          icon={faShoppingCart}
          className="cart-icon"
          onClick={goToCart} // Navigate to cart page when icon is clicked
        />
      </div>
      <div className="products">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <h2>{product.name}</h2>
            <p>
              Price: LKR{" "}
              {isNaN(Number(product.price))
                ? "N/A"
                : Number(product.price).toFixed(2)}
            </p>
            <p>Discount: {product.discount}%</p>
            <p>Volume: {product.volume}L</p>
            {/* Quantity input */}
            <div>
              <label htmlFor={`quantity-${product.product_ID}`}>
                Quantity:{" "}
              </label>
              <input
                type="number"
                id={`quantity-${product.product_ID}`}
                value={quantities[product.product_ID]}
                min="1"
                onChange={(e) =>
                  handleQuantityChange(
                    product.product_ID,
                    parseInt(e.target.value)
                  )
                }
              />
            </div>
            <button
              className={`order-button ${
                isInCart(product.product_ID) ? "added" : ""
              }`}
              onClick={() => handleOrder(product)}
              disabled={isInCart(product.product_ID)}
            >
              {isInCart(product.product_ID) ? "Added to Cart" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
