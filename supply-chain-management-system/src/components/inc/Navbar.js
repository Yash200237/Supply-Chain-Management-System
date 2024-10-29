import React from "react";
import { Link } from "react-router-dom";
import { FaInfoCircle, FaHome, FaUser} from "react-icons/fa"; // Icons for style


function NavBar() {
  return (
    <>
    <style type="text/css">
    {`
    .navbar {
      background-color: Blue !important;
    }
    `}
    </style>
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 shadow">
      <div className="container">
        <Link to="/" className="navbar-brand fs-3 fw-bold text-light">
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

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link text-light d-flex align-items-center gap-1">
                <FaHome /> Home 
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link text-light d-flex align-items-center gap-1">
                <FaInfoCircle /> About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/start" className="nav-link text-light d-flex align-items-center gap-1">
                <FaUser /> Log in
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav></>
  );
}

export default NavBar;
