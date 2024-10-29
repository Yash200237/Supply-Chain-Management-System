import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import "./Manager.css"; // Optional for additional styling
import profilePicture from "../../images/profilepicture.jpg";
import { FaPhone, FaEnvelope, FaStore } from "react-icons/fa"; // Icons for style

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [managerName, setManagerName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [storeID, setStoreID] = useState(null);

  useEffect(() => {
    console.log("Location state:", location.state);
    if (location.state) {
      const { managerName, fullName, email, phoneNumber, city, store_ID } =
        location.state;

      setManagerName(managerName);
      setFullName(fullName);
      setEmail(email);
      setPhoneNumber(phoneNumber);
      setCity(city);
      setStoreID(store_ID);

      localStorage.setItem("managerName", managerName);
      localStorage.setItem("fullName", fullName);
      localStorage.setItem("email", email);
      localStorage.setItem("phoneNumber", phoneNumber);
      localStorage.setItem("city", city);
      localStorage.setItem("storeID", store_ID);
    } else {
      const storedName = localStorage.getItem("managerName");
      const storedFullName = localStorage.getItem("fullName");
      const storedEmail = localStorage.getItem("email");
      const storedPhoneNumber = localStorage.getItem("phoneNumber");
      const storedCity = localStorage.getItem("city");
      const storedStoreID = localStorage.getItem("store_ID");

      if (
        storedName &&
        storedFullName &&
        storedEmail &&
        storedPhoneNumber &&
        storedCity &&
        storedStoreID
      ) {
        setManagerName(storedName);
        setFullName(storedFullName);
        setEmail(storedEmail);
        setPhoneNumber(storedPhoneNumber);
        setCity(storedCity);
        setStoreID(parseInt(storedStoreID));
      } else {
        navigate("/managerlogin");
      }
    }
  }, [location, navigate]);

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* Left side: Manager Details */}
        <div className="manager-details">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={profilePicture}
              alt="Customer Profile"
              className="profile-picture"
            />
            <h2>{fullName}</h2>
            <ul style={{ textAlign: "left", listStyleType: "none" }}>
              <li style={{ paddingBottom: "10px" }}>
                <FaEnvelope /> {email}
              </li>
              <li style={{ paddingBottom: "10px" }}>
                <FaPhone /> {phoneNumber}
              </li>
              <li style={{ paddingBottom: "10px" }}>
                <FaStore /> {city} Branch Manager
              </li>
            </ul>
          </div>
        </div>

        {/* Right side: Content */}
        <div className="content">
          <header>
            <h1>Welcome, {managerName}!</h1>
          </header>
          <div
            className="content-blocks"
            style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
          >
            <div className="content-block registration">
              <h2>Registration</h2>
              <p>Register Drivers and Assistant drivers</p>
              <Link to="/registration" className="button-link">
                <Button variant="contained" disableElevation>
                  Register
                </Button>
              </Link>
            </div>

            {/* Conditional rendering of "Schedule Orders to Trains" based on storeID */}
            {storeID === 1 && (
              <div className="content-block train-schedule">
                <h2>Schedule Orders to Trains</h2>
                <p>Check train schedule and assign orders to trains</p>
                <Link to="/trainschedule" className="button-link">
                  <Button variant="contained" disableElevation>
                    Assign Orders
                  </Button>
                </Link>
              </div>
            )}

            <div className="content-block truck-schedule">
              <h2>Create Truck Schedules</h2>
              <p>Schedule trucks for order delivery.</p>
              <Link to="/truckschedule" className="button-link">
                <Button variant="contained" disableElevation>
                  Schedule Trucks
                </Button>
              </Link>
            </div>

            <div className="content-block reports">
              <h2>Reports</h2>
              <p>
                Sales reports, Working Hours reports, Customer-order reports
              </p>
              <Link to="/reports" className="button-link">
                <Button variant="contained" disableElevation>
                  Generate Reports
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
