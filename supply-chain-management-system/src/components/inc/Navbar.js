import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaInfoCircle, FaHome, FaSignOutAlt } from "react-icons/fa"; // Icons for style
import img1 from "../../images/logo.png";
import "./Navbar.css";
function NavBar() {
  const navigate = useNavigate();

  // Logout function with role-based clearing
  const handleLogout = () => {
    const userRole = localStorage.getItem("role");

    // Clear the token
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Clear user-related details based on their role
    if (userRole === "customer") {
      localStorage.removeItem("customerName");
      localStorage.removeItem("customer_ID");
      localStorage.removeItem("fullName");
      localStorage.removeItem("email");
      localStorage.removeItem("phoneNumber");
      localStorage.removeItem("address");
      localStorage.removeItem("city");
      localStorage.removeItem("role");
    } else if (userRole === "driver" || userRole === "driverassistant") {
      localStorage.removeItem("driverName");
      localStorage.removeItem("driver_ID");
      localStorage.removeItem("role");
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    } else if (userRole === "manager") {
      localStorage.removeItem("managerName");
      localStorage.removeItem("manager_ID");
      localStorage.removeItem("role");
      localStorage.removeItem("fullName");
      localStorage.removeItem("email");
      localStorage.removeItem("phoneNumber");
      localStorage.removeItem("address");
      localStorage.removeItem("city");
      localStorage.removeItem("managerStoreID");
      localStorage.removeItem("storeID");
    }

    localStorage.removeItem("auth_token");
    navigate("/");
  };
  return (
    <>
      <style type="text/css">
        {`
    .navbar {
      background-color: #f85606 !important;
    }
    `}
    </style>
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-4 shadow">
      <div className="container">
        <Link to="/" className="navbar-brand fs-4 fw-bold text-light">
        <img class="logo" src={img1} alt="Logo" />
  
        
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="#navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link text-light d-flex align-items-center gap-1"
                >
                  <FaHome /> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/about"
                  className="nav-link text-light d-flex align-items-center gap-1"
                >
                  <FaInfoCircle /> About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/"
                  onClick={handleLogout}
                  className="nav-link text-light d-flex align-items-center gap-1"
                >
                  <FaSignOutAlt />
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
