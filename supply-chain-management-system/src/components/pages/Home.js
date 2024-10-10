// Home.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Import the CSS file
import Button from "@mui/material/Button";

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://via.placeholder.com/800x400?text=Slide+1",
      caption: "Welcome to SmartDelivery!",
    },
    {
      image: "https://via.placeholder.com/800x400?text=Slide+2",
      caption: "Optimize Your Supply Chain with Real-Time Data!",
    },
    {
      image: "https://via.placeholder.com/800x400?text=Slide+3",
      caption: "Streamline Your Operations Today!",
    },
  ];

  const totalSlides = slides.length;

  const changeSlide = (direction) => {
    setCurrentSlide((prev) => (prev + direction + totalSlides) % totalSlides);
  };

  const setSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide(1);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

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

        {/* Button Group */}
        <div className="button-group primary-buttons">
          <Link to="/login" className="button-link">
            <Button variant="contained">Login</Button>
          </Link>
          <Link to="/signup" className="button-link">
            <Button variant="contained">Signup</Button>
          </Link>
        </div>

        <div className="button-group secondary-buttons">
          <Link to="/customerdashboard" className="button-link">
            <button className="btn btn-customer">Customer</button>
          </Link>
          <Link to="/driverdashboard" className="button-link">
            <button className="btn btn-driver">Driver</button>
          </Link>
          <Link to="/managerdashboard" className="button-link">
            <button className="btn btn-manager">Manager</button>
          </Link>
        </div>
      </div>

      <footer className="footer">
        <p>© 2024 SmartDelivery. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
