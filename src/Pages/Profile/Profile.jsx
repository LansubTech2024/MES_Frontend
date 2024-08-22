import { useState, useEffect } from 'react';
import axios from 'axios';
import"./Profile .css";
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/SideBar/Sidebar';

const ProfileForm = () => {
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        designation: ''
    });

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/profile/', {
                    withCredentials: true  // If you're using session authentication
                });
                setProfileData({
                    name: `${response.data.first_name} ${response.data.last_name}`,
                    email: response.data.email,
                    designation: response.data.designation || 'Not specified'
                });
            } catch (error) {
                console.error('Error fetching profile data:', error);
                // Handle error (e.g., redirect to login if unauthorized)
            }
        };

        fetchProfileData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:8000/api/profile/', profileData, {
                withCredentials: true
            });
            alert('Profile updated successfully!');
            // Optionally, you can re-fetch the profile data here
        } catch (error) {
            console.error('Error updating profile:', error);
            // Handle error (e.g., display error message)
        }
    };

    return (
        <>
            <Header/>
            <Sidebar/>
            <div className="profile-container">
                <form onSubmit={handleSubmit}>
                    <div className="profile-details">
                        <h3>Profile Details</h3>
                        
                        <label>Name:</label>
                        <input 
                            type="text" 
                            name="name"  // Specify the name attribute
                            value={profileData.name} 
                            onChange={handleChange}  // Allow editing
                        />

                        <label>Email:</label>
                        <input 
                            type="email" 
                            name="email"  // Specify the name attribute
                            value={profileData.email} 
                            onChange={handleChange}  // Allow editing
                        />

                        <label>Designation:</label>
                        <input 
                            type="text" 
                            name="designation"  // Specify the name attribute
                            value={profileData.designation} 
                            onChange={handleChange}  // Allow editing
                        />
                    </div>
                    <button type="submit">Save</button>  {/* Submit button */}
                </form>
            </div>
        </>
    );
};

export default ProfileForm;
