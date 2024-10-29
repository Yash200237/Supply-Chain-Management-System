import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa"; // Icon for the About button

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
    } else if (userRole === "manager") {
      localStorage.removeItem("managerName");
      localStorage.removeItem("manager_ID");
      localStorage.removeItem("role");
    }

    localStorage.removeItem("auth_token");
    navigate("/");
  };

  return (
    <>
      <style type="text/css">
        {`
          .navbar {
            background-color: blue !important;
          }
          .navbar-brand {
            font-size: 1.75rem;
            font-weight: bold;
            color: white;
          }
          .nav-link {
            color: white !important;
            font-size: 1rem;
            display: flex;
            align-items: center;
            gap: 0.25rem;
          }
          .nav-link:hover {
            color: #e0e0e0 !important;
          }
          .navbar-toggler {
            border: none;
          }
          .navbar-toggler-icon {
            background-color: white;
          }
          .logout-button {
            background-color: #6c757d; /* Gray color */
            border: none;
            color: white;
            margin-left: 1rem;
            padding: 0.375rem 0.75rem;
            font-size: 1rem;
            border-radius: 0.25rem;
          }
          .logout-button:hover {
            background-color: #5a6268; /* Darker gray on hover */
            color: white;
          }
          @media (max-width: 768px) {
            .navbar-brand {
              font-size: 1.5rem;
            }
            .nav-link {
              font-size: 0.875rem;
            }
            .logout-button {
              font-size: 0.875rem;
              padding: 0.3rem 0.5rem;
            }
          }
        `}
      </style>

      <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 shadow">
        <div className="container">
          <Link to="/" className="navbar-brand">
            SmartDelivery
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  <FaInfoCircle /> About
                </Link>
              </li>
            </ul>

            {/* Logout button aligned to the right */}
            <ul className="navbar-nav" style={{ marginLeft: "auto" }}>
              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="btn logout-button"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
