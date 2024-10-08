import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";

import CustomerDashboard from "../customer/CustomerDashboard";
import Login from "./Login";

function Home() {
  return (
    <div>
      <div
        className="main-content"
        style={{
          padding: "20px",
          backgroundColor: "#f4f4f4",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          maxWidth: "800px",
          margin: "auto",
        }}
      >
        <h1
          style={{ color: "#333", textAlign: "center", marginBottom: "20px" }}
        >
          SmartDelivery
        </h1>
        <p
          style={{
            color: "#555",
            lineHeight: "1.6",
            fontSize: "16px",
            textAlign: "justify",
          }}
        >
          Welcome to SmartDelivery, your trusted partner in supply chain
          management and product procurement. We specialize in optimizing and
          streamlining your supply chain processes to ensure efficiency and
          reliability at every step. Our innovative solutions harness the power
          of advanced technology, data analytics, and industry expertise to
          enhance visibility and control over your supply chain. From
          procurement and inventory management to logistics and distribution, we
          provide tailored strategies that meet the unique needs of your
          business. In addition to our supply chain management services, we
          offer a wide range of high-quality products that you can purchase
          directly through our platform, ensuring you have everything you need
          to keep your operations running smoothly. With a commitment to
          excellence and a focus on sustainability, we help you reduce costs,
          improve customer satisfaction, and drive growth. Let us transform your
          supply chain into a competitive advantage, empowering you to navigate
          the complexities of the global market with confidence.
        </p>
      </div>

      <div className="main content"></div>
      <Link to="/login">
        <button >Login</button>
      </Link>
      <Link to="/signup">
        <button >Sign up</button>
      </Link>
      <Link to="/customerdashboard">
        <button >Customer</button>
      </Link>
    </div>
  );
}

export default Home;
