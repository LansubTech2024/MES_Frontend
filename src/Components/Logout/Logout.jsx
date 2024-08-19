import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import"./Logout.css";

const LogoutPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                // Perform logout API call if necessary
                await axios.post('http://localhost:8000/api/logout/', {}, {
                    withCredentials: true // If you're using session authentication
                });

                // Clear user data from local storage or state
                localStorage.removeItem('authToken'); // Adjust as necessary
                // For example, if you use a context or state management:
                // dispatch({ type: 'LOGOUT' });

                // Redirect to login page
                navigate('/login');
            } catch (error) {
                console.error('Logout failed:', error);
                // Handle logout error if needed
                // Optionally, redirect to an error page or login page
                navigate('/login');
            }
        };

        handleLogout();
    }, [navigate]);

    return (
        <div className="logout-container">
            <button type="submit">Logout</button>
        </div>
    );
};

export default LogoutPage;
