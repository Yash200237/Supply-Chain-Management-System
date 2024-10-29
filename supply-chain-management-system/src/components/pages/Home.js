// Home.js
import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Import the CSS file
import frontpage from "../../images/frontpage.jpeg"; // Import the front page image

function Home() {
  return (
    <div className="home-container">
      {/* Left Half with Image and Overlay */}
      <div className="left-half">
        <img src={frontpage} alt="Front Page" className="background-image" />
        <div className="overlay">
          <h1 className="title">Welcome to SmartDelivery!</h1>
          <p className="description">
            <strong>SmartDelivery</strong>, your trusted partner in supply chain
            management and product procurement. We specialize in optimizing and
            streamlining your supply chain processes to ensure efficiency and
            reliability at every step. Our innovative solutions harness the power
            of advanced technology, data analytics, and industry expertise to
            enhance visibility and control over your supply chain. From
            procurement and inventory management to logistics and distribution, we
            provide tailored strategies that meet the unique needs of your
            business. Let us transform your supply chain into a competitive
            advantage, empowering you to navigate the complexities of the global
            market with confidence.
          </p>
        </div>
      </div>

      {/* Right Half with White Background and Buttons */}
      <div className="right-half">
        <div className="button-group primary-buttons">
          <Link to="/customerlogin" className="button-link">
            <button className="btn btn-login">Login</button>
          </Link>
          <Link to="/signup" className="button-link">
            <button className="btn btn-signup">Signup</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;