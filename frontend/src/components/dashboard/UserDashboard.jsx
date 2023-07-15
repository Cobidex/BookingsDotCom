import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [userProfile, setUserProfile] = useState(null);

  // Fetch user profile data when the component mounts
  useEffect(() => {
    getUserProfile();
  }, []);

  // Function to fetch user profile data
  const getUserProfile = async () => {
    try {
      const response = await axios.get('/api/users/profile');
      setUserProfile(response.data);
    } catch (error) {
      console.log('Error fetching user profile:', error);
    }
  };

  // Function to handle user profile update
  const handleProfileUpdate = async (updatedProfile) => {
    try {
      const response = await axios.put('/api/users/edit', updatedProfile);
      setUserProfile(response.data);
    } catch (error) {
      console.log('Error updating user profile:', error);
    }
  };

  // Function to handle user account deletion
  const handleDeleteAccount = async () => {
    try {
      await axios.delete('/api/users/delete');
      // Optionally, you can redirect the user to a different page after account deletion
      // window.location.href = '/goodbye'; 
    } catch (error) {
      console.log('Error deleting user account:', error);
    }
  };

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Welcome, {userProfile.firstname}!</h2>
      <p>Email: {userProfile.email}</p>
      <p>Phone Number: {userProfile.phonenumber}</p>
      <p>Account Type: {userProfile.isAdmin ? 'Admin' : 'User'}</p>

      {/* Form for updating user profile */}
      <form onSubmit={(e) => {
        e.preventDefault();
        const updatedProfile = {
          firstName: e.target.firstName.value,
          lastName: e.target.lastName.value,
          email: e.target.email.value,
          phoneNumber: e.target.phoneNumber.value,
        };
        handleProfileUpdate(updatedProfile);
      }}>
        <label htmlFor="firstName">First Name:</label>
        <input type="text" name="firstName" defaultValue={userProfile.firstname} />
        <br />
        <label htmlFor="lastName">Last Name:</label>
        <input type="text" name="lastName" defaultValue={userProfile.lastname} />
        <br />
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" defaultValue={userProfile.email} />
        <br />
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input type="tel" name="phoneNumber" defaultValue={userProfile.phonenumber} />
        <br />
        <button type="submit">Update Profile</button>
      </form>

      {/* Button for account deletion */}
      <button onClick={handleDeleteAccount}>Delete Account</button>
    </div>
  );
};

export default UserDashboard;
