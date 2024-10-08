import React from 'react';
import { useNavigate } from 'react-router-dom';

const DriverDashboard = ({ customerName }) => {
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
                <h1>Welcome, {customerName}!</h1>
            </header>
            <div className="content-blocks">
                <div className="content-block order-products">
                    <h2>Order Products</h2>
                    <p>Browse our catalog and place orders for your favorite products.</p>
                    <button className="button" onClick={handleOrderProducts}>
                        Order Products
                    </button>
                </div>
                <div className="content-block track-delivery">
                    <h2>Track Delivery</h2>
                    <p>Check the status of your orders and delivery timelines.</p>
                    <button className="button" onClick={handleTrackDelivery}>
                        Track Delivery
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DriverDashboard;
