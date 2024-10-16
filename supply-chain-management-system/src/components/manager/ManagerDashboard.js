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
                    <h2>PENDING ORDERS</h2>
                    <p>Check pending orders.</p>
                    <Link to="/pendingorders" className="button-link">
                    <button className="button">
                        ORDER LIST
                    </button>
                    </Link>
                </div>
                <div className="content-block train-shedual">
                    <h2>TRAIN SCHEDUAL</h2>
                    <p>Check train schedule.</p>
                    <Link to="/trainschedual" className="button-link">
                    <button className="button">
                    TRAIN SCHEDUAL
                    </button>
                    </Link>
                    
                </div>
                
                <div className="content-block truck-shedual">
                    <h2>TRUCK SCHEDUAL</h2>
                    <p>Schedule trucks for order delivery.</p>
                    
                    <button className="button">
                    TRUCK SCHEDUAL
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;
