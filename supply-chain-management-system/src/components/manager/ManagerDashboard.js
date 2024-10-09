import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const ManagerDashboard = ({ customerName }) => {
    const navigate = useNavigate(); // Use the navigate hook from React Router

    const handleOrderProducts = () => {
        navigate('/order-products'); // Navigate to the Order Products page
    };

    const handleTrackDelivery = () => {
        // Logic to track delivery (e.g., redirect to the tracking page)
        console.log('Track delivery button clicked');
    };

    return (
        <div className="dashboard">
            <header>
                <h1>Welcome {customerName}!</h1>
            </header>
            <div className="content-blocks">

                <div className="content-block order-list">
                    <h2>Pending Orders</h2>
                    <p>Check pending orders.</p>
                    <button className="button" onClick={handleTrackDelivery}>
                        Order List
                    </button>
                </div>
                <div className="content-block train-shedual">
                    <h2>Train Schedual</h2>
                    <p>Check train schedule.</p>
                    <Link to="/trainschedual" className="button-link">
                    <button className="button">
                        Train Shedual
                    </button>
                    </Link>
                    
                </div>
                
                <div className="content-block truck-shedual">
                    <h2>Truck Schedual</h2>
                    <p>Schedule trucks for order delivery.</p>
                    <button className="button" onClick={handleTrackDelivery}>
                        Truck Shedual
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;
