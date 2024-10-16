// Home.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../App.css";


function Home() {
  return (
    <div className="home-container">
      <div className="main-content">
        <h1 className="title">Welcome to SmartDelivery !</h1>
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

        {/* Carousel */}
        <div className="carousel">
          <div
            className="carousel-slides"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div className="carousel-slide" key={index}>
                <img src={slide.image} alt={`Slide ${index + 1}`} />
                <div className="carousel-caption">{slide.caption}</div>
              </div>
            ))}
          </div>
          <button
            className="carousel-button prev"
            onClick={() => changeSlide(-1)}
          >
            &#10094;
          </button>
          <button
            className="carousel-button next"
            onClick={() => changeSlide(1)}
          >
            &#10095;
          </button>
          <div className="carousel-indicators">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`indicator ${
                  currentSlide === index ? "active" : ""
                }`}
                onClick={() => setSlide(index)}
              ></span>
            ))}
          </div>
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
      <Link to="/driverdashboard">
        <button >Driver</button>
      </Link>
      <Link to="/managerdashboard">
        <button >Manager</button>
      </Link>
    </div>
  );
}

export default Home;
