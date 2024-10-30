import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './DriverDashboard.css';
import profilePicture from '../../images/profilepicture.jpg'; // Add profile picture for consistency
import { FaPhone, FaEnvelope, FaCity } from "react-icons/fa"; // Icons for style

const DriverDashboard = () => {
    const { state } = useLocation();
    const driverName = state?.driverName;
    const driverID = localStorage.getItem("driver_ID");
    const [upcomingTrips, setUpcomingTrips] = useState([]);
    const [completedTrips, setCompletedTrips] = useState([]);
    
    // Adding additional driver details
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [city, setCity] = useState("");
    const [fullName, setFullName] = useState("");

    useEffect(() => {
        if (!driverID) return;

        const fetchDriverDetails = async () => {
            try {
                console.log("Driver ID: ", driverID);
                const response = await axios.get(`http://localhost:5000/driverdetails/${driverID}`);
                const details = response.data;

                setEmail(details.email);
                setPhoneNumber(details.phoneNumber);
                setCity(details.city);
                setFullName(details.fullName);
            } catch (error) {
                console.error("Error fetching driver details:", error);
            }
        };

        const fetchSchedules = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/driverschedule/${driverID}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const trips = response.data;

                setUpcomingTrips(trips.filter(trip => trip.status === 'scheduled'));
                setCompletedTrips(trips.filter(trip => trip.status === 'completed'));
            } catch (error) {
                console.error("Error fetching schedules:", error);
            }
        };

        fetchDriverDetails();
        fetchSchedules();
    }, [driverID]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <div className="dashboard" style={{ flex: "1" }}>
            <div className="dashboard-container">
                {/* Left side: Driver Details */}
                <div className="driver-details">
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <img
                            src={profilePicture}
                            alt="Driver Profile"
                            className="profile-picture"
                        />
                        <h2>{fullName}</h2>
                        <ul style={{ textAlign: "left", listStyleType: "none", paddingLeft: "10px" }}>
                            <li style={{ paddingBottom: "10px" }}>
                                <FaEnvelope /> {email}
                            </li>
                            <li style={{ paddingBottom: "10px" }}>
                                <FaPhone /> {phoneNumber}
                            </li>
                            <li style={{ paddingBottom: "10px" }}>
                                <FaCity /> {city}
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Right side: Content */}
                <div className="content">
                    <header>
                        <h1 className="greeting">Welcome, {driverName || "Driver"}!</h1>
                    </header>
                    <div className="schedule-section">
                        <h2>Upcoming Trips</h2>
                        <table className="trip-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Truck ID</th>
                                    <th>Assistant</th>
                                    <th>Route</th>
                                </tr>
                            </thead>
                            <tbody>
                                {upcomingTrips.map((trip) => (
                                    <tr key={trip.schedule_ID}>
                                        <td>{formatDate(trip.trip_date)}</td>
                                        <td>{trip.trip_time}</td>
                                        <td>{trip.truck_Id} ({trip.truck_number_plate})</td>
                                        <td>{trip.driver_assistant_name}</td>
                                        <td>{trip.path_description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <h2>Completed Trips</h2>
                        <table className="trip-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Truck ID</th>
                                    <th>Assistant</th>
                                    <th>Route</th>
                                </tr>
                            </thead>
                            <tbody>
                                {completedTrips.map((trip) => (
                                    <tr key={trip.schedule_ID} className="completed-row">
                                        <td>{formatDate(trip.trip_date)}</td>
                                        <td>{trip.trip_time}</td>
                                        <td>{trip.truck_Id} ({trip.truck_number_plate})</td>
                                        <td>{trip.driver_assistant_name}</td>
                                        <td>{trip.path_description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DriverDashboard;
