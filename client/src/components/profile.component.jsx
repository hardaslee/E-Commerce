import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import '../assets/Profile.css';
import { Link } from "react-router-dom";


const Profile = () => {
    const [redirect, setRedirect] = useState(null);
    const [currentUser, setCurrentUser] = useState({ username: "" });
    const [showOrdersDropdown, setShowOrdersDropdown] = useState(false);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (!user) setRedirect("/home");
        setCurrentUser(user);
    }, []);

    const toggleOrdersDropdown = () => {
        setShowOrdersDropdown(!showOrdersDropdown);
    };

    const orders = [
        { id: 1, date: '2024-01-15', status: 'Delivered' },
        { id: 2, date: '2024-01-20', status: 'In Transit' }
        // ... more orders
    ];

    const continueShopping = () => {
         navigate('/shop');
    };

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <div className="profile-container">
            {currentUser ? (
                <div className="profile-card">
                    <div className="profile-image-section">
                        <img src="../images/profile.png" alt="Profile" className="profile-image"/>
                    </div>
                    <div className="profile-header">
                        <h3>{currentUser.username}'s Profile</h3>
                    </div>
                    <div className="profile-bio">
                        <p>Enter your bio description.</p>
                    </div>
                    <div className="profile-details">
                        <p><strong>Email:</strong> {currentUser.email}</p>
                        <p><strong>Phone:</strong> (514) 251 - 9211</p>
                        <p><strong>Location:</strong> Montreal, QC, Canada</p>


                        {/* More details like ID, roles, etc. */}
                    </div>
                    
                    <div className="profile-contact">
                        <p>Contact information or social media links</p>
                    </div>

                    <button className="orders-button" onClick={toggleOrdersDropdown}>
                        <h5>My Orders</h5>
                    </button>

                    {showOrdersDropdown && (
                        <div className="orders-dropdown">
                            <ul>
                                {orders.map((order) => (
                                    <li key={order.id}>
                                        <strong>Order ID:</strong> {order.id}, 
                                        <strong> Date:</strong> {order.date}, 
                                        <strong> Status:</strong> {order.status}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="profile-continue-shopping">
                    <Link to="/hats">

                        <button  className="continueShopping">
                            Continue Shopping
                        </button>
                        </Link> 

                    </div>
                    {/* Other profile sections */}
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default Profile;
