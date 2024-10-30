// DriverDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './DriverDashboard.css';

const DriverDashboard = () => {
    const { state } = useLocation();
    const driverName = state?.driverName;
    const driverID = localStorage.getItem("driver_ID");
    const [upcomingTrips, setUpcomingTrips] = useState([]);
    const [completedTrips, setCompletedTrips] = useState([]);

    useEffect(() => {
        if (!driverID) return;

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

        fetchSchedules();
    }, [driverID]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <div className="driver-dashboard">
            <h1 className="greeting">Hello Driver {driverName}</h1>
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
    );
};

export default DriverDashboard;
