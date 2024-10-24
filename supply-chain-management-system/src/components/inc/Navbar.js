import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css"; // Import your custom CSS for extra styling

function NavBar() {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    // Just remove the token; leave the cart data intact
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Optionally clear token in other storage (if used)
    localStorage.removeItem("auth_token"); // If you're using additional storage for token

    // Redirect to login page
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          SmartDelivery
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
          </ul>

          {/* Logout button aligned to the right */}
          <ul className="navbar-nav mb-2 mb-lg-0 align-right">
            <li className="nav-item">
              <button
                onClick={handleLogout}
                className="btn btn-outline-danger logout-button"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
