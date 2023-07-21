import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';


const UserDashboard = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);

  // Fetch user profile data when the component mounts
  useEffect(() => {
    getUserProfile();
  }, []);

  // Function to fetch user profile data
  const getUserProfile = async () => {
    try {
      const response = await api.get('/users/profile');
      setUserProfile(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/signin');
      } else {
        console.log('Error fetching user profile:', error);
      }
    }
  };

  // Function to handle user profile update
  const handleProfileUpdate = async (updatedProfile) => {
    try {
      const response = await api.put('/users/profile', updatedProfile);
      setUserProfile(response.data);
    } catch (error) {
      console.log('Error updating user profile:', error);
    }
  };

  // Function to handle user account deletion
  const handleDeleteAccount = async () => {
    try {
      await api.delete('/users/delete');
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
    <div className='flex flex-col justify-center items-center min-h-screen'>
	<div className="max-w-md w-full mx-4 bg-gray-600/30 p-6 rounded-lg shadow-md border border-white backdrop-brightness-50">	  
      <h2 className='text-2xl text-teal-400 text-center font-bold mb-4'>Welcome, {userProfile.firstname}!</h2>
      <p className = 'text-white text-lg font-thin'>Email: {userProfile.email}</p>
      <p className = 'text-white text-lg font-thin'>Phone Number: {userProfile.phonenumber}</p>
      <p className = 'text-white text-lg font-thin'>Account Type: {userProfile.isAdmin ? 'Admin' : 'User'}</p>

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
        <label htmlFor="firstName" className='text-lg text-teal-400 font-thin block mb-2'>First Name:</label>
        <input type="text" firstName="firstName" defaultValue={userProfile.firstname} className="w-full border border-gray-300 rounded py-2 px-3 mb-3" />
        <br />
        <label htmlFor="lastName" className="text-lg text-teal-400 font-thin block mb-2">Last Name:</label>
        <input type="text" name="lastName" defaultValue={userProfile.lastname} className="w-full border border-gray-300 rounded py-2 px-3 mb-3" />
        <br />
        <label htmlFor="email" className="text-lg text-teal-400 font-thin block mb-2">Email:</label>
        <input type="email" name="email" defaultValue={userProfile.email} className="w-full border border-gray-300 rounded py-2 px-3 mb-3" />
        <br />
        <label htmlFor="phoneNumber" className="block mb-2 text-lg text-teal-400 font-thin">Phone Number:</label>
        <input type="tel" name="phoneNumber" defaultValue={userProfile.phonenumber} className="w-full border border-gray-300 rounded py-2 px-3 mb-3" />
        <br />
        <button type="submit" className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">Update Profile</button>
      </form>

      {/* Button for account deletion */}
      <button onClick={handleDeleteAccount} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete Account</button>
    </div>
	  </div>
  );
};

export default UserDashboard;
